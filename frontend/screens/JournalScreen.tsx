import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import PhoneFrame from "../components/PhoneFrame";
import BottomNavigation from "../components/BottomNavigation";

export default function JournalScreen() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = () => {
    console.log("Title:", title);
    console.log("Content:", content);
  };

  return (
    <PhoneFrame>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >

        <Text style={styles.heading}>
          📖 My Journal
        </Text>

        <Text style={styles.subHeading}>
          Every thought matters. Your journal is your safe space. 🌸
        </Text>

        <Text style={styles.label}>
          Title
        </Text>

        <TextInput
          style={styles.titleInput}
          placeholder="e.g. Feeling Better Today 🌸"
          placeholderTextColor="#B7A9AF"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>
          Today's Thoughts
        </Text>

        <View style={styles.diaryContainer}>

          {/* Notebook Lines */}

          {/* <View style={styles.linesContainer}>
            {Array.from({ length: 8 }).map((_, index) => (
              <View
                key={index}
                style={styles.line}
              />
            ))}
          </View> */}

          <TextInput
            style={styles.contentInput}
            placeholder="Dear Diary..."
            placeholderTextColor="#B7A9AF"
            multiline
            textAlignVertical="top"
            value={content}
            onChangeText={setContent}
          />

        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>
            💗 Save Entry
          </Text>
        </TouchableOpacity>

      </ScrollView>

      <BottomNavigation />

    </PhoneFrame>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#FFF8FB",
    paddingHorizontal: 20,
    paddingTop: 22,
  },

  heading: {
    fontSize: 30,
    fontWeight: "700",
    color: "#EF4F8F",
    marginBottom: 8,
  },

  subHeading: {
    fontSize: 15,
    color: "#777",
    lineHeight: 22,
    marginBottom: 28,
  },

  label: {
    fontSize: 17,
    fontWeight: "700",
    color: "#444",
    marginBottom: 10,
  },

  titleInput: {
    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#FFD7E6",

    borderRadius: 18,

    height: 56,

    paddingHorizontal: 18,

    fontSize: 16,

    color: "#333",

    marginBottom: 26,
  },

  diaryContainer: {

    position: "relative",

    backgroundColor: "#FFFDFE",

    borderWidth: 1,

    borderColor: "#FFD7E6",

    borderRadius: 22,

    height: 280,

    overflow: "hidden",

    marginBottom: 32,
  },

  linesContainer: {

    position: "absolute",

    top: 20,

    left: 0,

    right: 0,

  },

  line: {

    height: 30,

    borderBottomWidth: 1,

    borderBottomColor: "#F6DCE7",

  },

  contentInput: {

    flex: 1,

    paddingHorizontal: 18,

    paddingTop: 18,

    fontSize: 16,

    color: "#444",

    lineHeight: 30,
  },

  saveButton: {

    backgroundColor: "#EF4F8F",

    height: 56,

    borderRadius: 30,

    justifyContent: "center",

    alignItems: "center",

    marginBottom: 35,

    shadowColor: "#EF4F8F",

    shadowOpacity: 0.25,

    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 6,
  },

  saveButtonText: {

    color: "#FFFFFF",

    fontSize: 17,

    fontWeight: "700",
  },

});