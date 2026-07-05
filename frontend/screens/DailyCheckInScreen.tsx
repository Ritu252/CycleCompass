import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image
} from "react-native";

import PhoneFrame from "../components/PhoneFrame";
import api from "../services/api"

export default function DailyCheckInScreen() {
  const [isPeriodDay, setIsPeriodDay] = useState(false);
  const [periodDay, setPeriodDay] = useState("");
  const [flow, setFlow] = useState("");

  const [mood, setMood] = useState("");
  const [energyLevel, setEnergyLevel] = useState("");

  const [weight, setWeight] = useState("");
  const [notes, setNotes] = useState("");

  const [symptoms, setSymptoms] = useState({
    acne: false,
    hairFall: false,
    bloating: false,
    facialHairGrowth: false,
    cravings: false,
  });

  const toggleSymptom = (symptom: keyof typeof symptoms) => {
    setSymptoms({
      ...symptoms,
      [symptom]: !symptoms[symptom],
    });
  };

  const handleDailyCheckIn = async () => {
  try {
    // Save Cycle Data
    const cycleResponse = await api.post("/api/cycle", {
      is_period_day: isPeriodDay,
      period_day: isPeriodDay ? Number(periodDay) : null,
      flow: isPeriodDay ? flow : null,
    });

    // Save Symptoms Data
    const symptomResponse = await api.post("api/symptoms", {
      acne: symptoms.acne,
      hair_fall: symptoms.hairFall,
      bloating: symptoms.bloating,
      facial_hair_growth: symptoms.facialHairGrowth,
      cravings: symptoms.cravings,
      mood,
      energy_level: energyLevel,
      weight: weight ? Number(weight) : null,
      notes,
    });

    console.log(cycleResponse.data);
    console.log(symptomResponse.data);

    alert("Daily Check-In Saved Successfully!");

    // Reset cycle data
    setIsPeriodDay(false);
    setPeriodDay("");
    setFlow("");

    // Reset symptom data
    setSymptoms({
      acne: false,
      hairFall: false,
      bloating: false,
      facialHairGrowth: false,
      cravings: false,
    });

    // Reset remaining fields
    setMood("");
    setEnergyLevel("");
    setWeight("");
    setNotes("");

  } catch (error: any) {
    console.log("Daily Check-In Error:");
    console.log(error);

    alert(
      error.response?.data?.message ||
      "Daily Check-In Failed"
    );
  }
};

  return (
    <PhoneFrame>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>Daily Check-In</Text>

        {/* PERIOD SECTION */}

        <Text style={styles.sectionTitle}>
          🩸 Menstrual Tracking
        </Text>

        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.chip,
              isPeriodDay && styles.selectedChip,
            ]}
            onPress={() => setIsPeriodDay(true)}
          >
            <Text>Period Today</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.chip,
              !isPeriodDay && styles.selectedChip,
            ]}
            onPress={() => setIsPeriodDay(false)}
          >
            <Text>No Period</Text>
          </TouchableOpacity>
        </View>

        {isPeriodDay && (
          <>
            <Text style={styles.label}>
              Period Day
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Day 1, Day 2..."
              placeholderTextColor="#9CA3AF"
              value={periodDay}
              onChangeText={setPeriodDay}
            />

            <Text style={styles.label}>
              Flow
            </Text>

            <View style={styles.row}>
              {["Light", "Medium", "Heavy"].map(
                (item) => (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.chip,
                      flow === item &&
                        styles.selectedChip,
                    ]}
                    onPress={() => setFlow(item)}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </>
        )}

        {/* MOOD */}

        <Text style={styles.sectionTitle}>
          😊 Mood
        </Text>

        <View style={styles.row}>
          {[
            "Happy",
            "Neutral",
            "Sad",
            "Irritable",
          ].map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.chip,
                mood === item &&
                  styles.selectedChip,
              ]}
              onPress={() => setMood(item)}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ENERGY */}

        <Text style={styles.sectionTitle}>
          ⚡ Energy Level
        </Text>

        <View style={styles.row}>
          {["Up", "Normal", "Low"].map(
            (item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.chip,
                  energyLevel === item &&
                    styles.selectedChip,
                ]}
                onPress={() =>
                  setEnergyLevel(item)
                }
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )
          )}
        </View>

        {/* WEIGHT */}

        <Text style={styles.sectionTitle}>
          ⚖️ Weight (kg)
        </Text>

        <TextInput
          style={styles.input}
          placeholder="49.5"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />

        {/* SYMPTOMS */}
        
        <Text style={styles.sectionTitle}>
           💆🏻‍♀️ Symptoms
        </Text>

        <View style={styles.row}>
          {[
            {
              key: "acne",
              label: "Acne",
            },
            {
              key: "hairFall",
              label: "Hair Fall",
            },
            {
              key: "bloating",
              label: "Bloating",
            },
            {
              key: "facialHairGrowth",
              label: "Facial Hair",
            },
            {
              key: "cravings",
              label: "Cravings",
            },
          ].map((symptom) => (
            <TouchableOpacity
              key={symptom.key}
              style={[
                styles.chip,
                symptoms[
                  symptom.key as keyof typeof symptoms
                ] && styles.selectedChip,
              ]}
              onPress={() =>
                toggleSymptom(
                  symptom.key as keyof typeof symptoms
                )
              }
            >
              <Text>{symptom.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* NOTES */}

        <Text style={styles.sectionTitle}>
          📝 Notes
        </Text>

        <TextInput
          style={styles.notesInput}
          multiline
          placeholder="How are you feeling today?"
          placeholderTextColor="#9CA3AF"
          value={notes}
          onChangeText={setNotes}
        />

        {/* SAVE BUTTON */}

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleDailyCheckIn}
        >
          <Text style={styles.saveButtonText}>
            💕 Save Check-In
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </PhoneFrame>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    paddingBottom: 50,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FF5EA8",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#5A4A4A",
    marginBottom: 10,
    marginTop: 15,
  },

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 10,
  },

  chip: {
    backgroundColor: "#FFF7FA",
    borderWidth: 1,
    borderColor: "#FFD3E5",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },

  selectedChip: {
    backgroundColor: "#FFB6D9",
  },

  label: {
    marginBottom: 5,
    marginTop: 10,
    fontSize: 15,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },

  notesInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    height: 120,
    textAlignVertical: "top",
  },

  saveButton: {
    backgroundColor: "#FF5EA8",
    padding: 18,
    borderRadius: 25,
    marginTop: 25,
    alignItems: "center",
  },

  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },

});