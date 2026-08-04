import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Svg, { Line, Polyline, Circle, Text as SvgText } from "react-native-svg";

import AsyncStorage from "@react-native-async-storage/async-storage";
import PhoneFrame from "../components/PhoneFrame";
import BottomNavigation from "../components/BottomNavigation";
import api from "../services/api";

type WeightPoint = {
  label: string;
  value: number;
};

const POINT_SPACING = 52;
const MIN_CHART_WIDTH = 300;

function formatLabel(dateString: string) {
  const [, month, day] = dateString.split("-");
  return `${Number(month)}/${Number(day)}`;
}

function WeightLineChart({ data }: { data: WeightPoint[] }) {
  const height = 160;
  const paddingLeft = 34;
  const paddingRight = 16;
  const paddingTop = 16;
  const paddingBottom = 26;

  const width = Math.max(MIN_CHART_WIDTH, data.length * POINT_SPACING);
  const plotWidth = width - paddingLeft - paddingRight;
  const plotHeight = height - paddingTop - paddingBottom;

  const values = data.map((d) => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const valueRange = maxValue - minValue || 1;

  const points = data.map((d, i) => {
    const x =
      paddingLeft +
      (data.length === 1 ? plotWidth / 2 : (i / (data.length - 1)) * plotWidth);
    const y =
      paddingTop + plotHeight - ((d.value - minValue) / valueRange) * plotHeight;
    return { x, y, label: d.label };
  });

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <Svg width={width} height={height}>
      <Line
        x1={paddingLeft}
        y1={paddingTop}
        x2={width - paddingRight}
        y2={paddingTop}
        stroke="#F3D7E2"
        strokeWidth={1}
      />
      <Line
        x1={paddingLeft}
        y1={height - paddingBottom}
        x2={width - paddingRight}
        y2={height - paddingBottom}
        stroke="#F3D7E2"
        strokeWidth={1}
      />

      <SvgText x={2} y={paddingTop + 4} fontSize={10} fill="#999">
        {maxValue}kg
      </SvgText>
      <SvgText x={2} y={height - paddingBottom + 4} fontSize={10} fill="#999">
        {minValue}kg
      </SvgText>

      <Polyline
        points={polylinePoints}
        fill="none"
        stroke="#EF4F8F"
        strokeWidth={2.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {points.map((p, i) => (
        <Circle key={i} cx={p.x} cy={p.y} r={3.5} fill="#EF4F8F" />
      ))}

      {points.map((p, i) => (
        <SvgText
          key={`label-${i}`}
          x={p.x}
          y={height - 6}
          fontSize={9}
          fill="#999"
          textAnchor="middle"
        >
          {p.label}
        </SvgText>
      ))}
    </Svg>
  );
}

function WeightBarChart({ data }: { data: WeightPoint[] }) {
  const barMaxHeight = 130;
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <View style={[styles.barChartRow, { minWidth: Math.max(MIN_CHART_WIDTH, data.length * POINT_SPACING) }]}>
      {data.map((d, i) => {
        const barHeight =
          maxValue > 0 ? Math.max((d.value / maxValue) * barMaxHeight, 4) : 4;

        return (
          <View key={i} style={styles.barColumn}>
            <Text style={styles.barValue}>{d.value}</Text>
            <View style={[styles.bar, { height: barHeight }]} />
            <Text style={styles.barLabel}>{d.label}</Text>
          </View>
        );
      })}
    </View>
  );
}

export default function HealthInsightsScreen() {
  const [weightData, setWeightData] = useState<WeightPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadInsights = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/api/report", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const symptoms = response.data?.symptoms || [];

        const points: WeightPoint[] = symptoms
          .filter((entry: any) => entry.weight !== null && entry.weight !== "")
          .map((entry: any) => ({
            date: entry.symptom_date,
            label: formatLabel(entry.symptom_date),
            value: Number(entry.weight),
          }))
          .sort((a: any, b: any) => (a.date > b.date ? 1 : -1));

        setWeightData(points);
      } catch (error) {
        console.log("Health insights load error:", error);
        setErrorMessage("Couldn't load your health insights right now.");
      } finally {
        setLoading(false);
      }
    };

    loadInsights();
  }, []);

  return (
    <PhoneFrame>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Health Insights</Text>
        <Text style={styles.subtitle}>Your weight trend at a glance</Text>

        {loading && (
          <View style={styles.stateBox}>
            <ActivityIndicator color="#EF4F8F" />
          </View>
        )}

        {!loading && errorMessage !== "" && (
          <View style={styles.stateBox}>
            <Text style={styles.stateText}>{errorMessage}</Text>
          </View>
        )}

        {!loading && errorMessage === "" && weightData.length === 0 && (
          <View style={styles.stateBox}>
            <Text style={styles.stateText}>
              No weight records yet. Log your weight during a symptom
              check-in to see insights here.
            </Text>
          </View>
        )}

        {!loading && weightData.length > 0 && (
          <>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>📈 Weight Trend</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <WeightLineChart data={weightData} />
              </ScrollView>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>📊 Weight by Entry</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <WeightBarChart data={weightData} />
              </ScrollView>
            </View>
          </>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      <BottomNavigation />
    </PhoneFrame>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8FB",
    paddingHorizontal: 18,
  },

  title: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: "700",
    color: "#EF4F8F",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },

  stateBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#FFD8E5",
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  stateText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#FFD8E5",
    padding: 18,
    marginBottom: 18,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 14,
  },

  barChartRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },

  barColumn: {
    width: POINT_SPACING,
    alignItems: "center",
  },

  bar: {
    width: 18,
    backgroundColor: "#EF4F8F",
    borderRadius: 6,
    marginTop: 4,
  },

  barValue: {
    fontSize: 10,
    color: "#999",
  },

  barLabel: {
    fontSize: 9,
    color: "#999",
    marginTop: 6,
  },
});
