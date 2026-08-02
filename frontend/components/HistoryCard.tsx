import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

type HistoryCardProps = {
  date: string;
  cycle: string;
  duration: string;
  flow: string;
  mood: string;
  energy: string;
  symptoms: string[];
  notes: string;
};

export default function HistoryCard({
  date,
  cycle,
  duration,
  flow,
  mood,
  energy,
  symptoms,
  notes,
}: HistoryCardProps) {
  return (
    <View style={styles.card}>

      {/* Date */}

      <Text style={styles.date}>
        📅 {date}
      </Text>

      <View style={styles.divider} />

      {/* Cycle Details */}

      <View style={styles.infoRow}>
        <Text style={styles.label}>🩸 Cycle:</Text>
        <Text style={styles.value}>{cycle}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>⏳ Duration:</Text>
        <Text style={styles.value}>{duration}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>💧 Flow:</Text>
        <Text style={styles.value}>{flow}</Text>
      </View>

      {/* Mood + Energy */}

      <View style={styles.doubleRow}>

        <View style={styles.halfRow}>
          <Text style={styles.label}>😊 Mood:</Text>
          <Text style={styles.value}>{mood}</Text>
        </View>

        <View style={styles.halfRow}>
          <Text style={styles.label}>⚡ Energy:</Text>
          <Text style={styles.value}>{energy}</Text>
        </View>

      </View>

      {/* Symptoms */}

      <Text style={styles.sectionTitle}>
        Symptoms
      </Text>

      <Text style={styles.symptoms}>
        {symptoms.length > 0
          ? symptoms.map((item) => `✓ ${item}`).join("  •  ")
          : "No symptoms reported"}
      </Text>

      {/* Notes */}

      <Text style={styles.sectionTitle}>
        📝 Notes
      </Text>

      <Text style={styles.notes}>
        {notes || "No notes added."}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 22,

    borderWidth: 1,
    borderColor: "#FFD8E5",

    padding: 16,

    marginBottom: 14,
  },

  date: {
    fontSize: 17,

    fontWeight: "700",

    color: "#333",

    marginBottom: 10,
  },

  divider: {
    height: 1,

    backgroundColor: "#F3D7E2",

    marginBottom: 12,
  },

  infoRow: {
    flexDirection: "row",

    alignItems: "center",

    marginBottom: 6,
  },

  label: {
    fontSize: 15,

    fontWeight: "700",

    color: "#EF4F8F",

    width: 95,
  },

  value: {
    flex: 1,

    fontSize: 15,

    color: "#444",
  },

  doubleRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    marginTop: 6,

    marginBottom: 12,
  },

  halfRow: {
    flexDirection: "row",

    alignItems: "center",

    width: "48%",
  },

  sectionTitle: {
    fontSize: 15,

    fontWeight: "700",

    color: "#EF4F8F",

    marginBottom: 5,

    marginTop: 2,
  },

  symptoms: {
    fontSize: 14,

    color: "#444",

    lineHeight: 22,

    marginBottom: 10,
  },

  notes: {
    fontSize: 14,

    color: "#555",

    lineHeight: 20,
  },

});