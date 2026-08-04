import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

import PhoneFrame from "../components/PhoneFrame";
import BottomNavigation from "../components/BottomNavigation";
import BackButton from "../components/BackButton";

export default function AIAssistScreen() {

  const [question, setQuestion] = useState("");

  const handleSend = () => {
    console.log(question);
  };

  return (

    <PhoneFrame>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >

        <BackButton />

        <Text style={styles.heading}>
          AI Wellness Assistant
        </Text>

        <Text style={styles.subHeading}>
          Your personal PCOS companion 💕
        </Text>

        {/* AI Card */}

        <View style={styles.aiCard}>

          <Image
            source={require("../assets/images/robot_copy.png")}
            style={styles.robot}
          />

          <Text style={styles.greeting}>
            Hi Ritu! 👋
          </Text>

          <Text style={styles.description}>
            Ask me anything about your cycle,
            symptoms, nutrition or wellness.
          </Text>

        </View>

        {/* Suggestions */}

        <Text style={styles.sectionTitle}>
          Suggested Questions
        </Text>

        <TouchableOpacity style={styles.questionCard}>
          <Text style={styles.questionText}>
            💬 Why am I feeling tired today?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.questionCard}>
          <Text style={styles.questionText}>
            💬 Explain my cycle history
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.questionCard}>
          <Text style={styles.questionText}>
            💬 Give me today's wellness tips
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.questionCard}>
          <Text style={styles.questionText}>
            💬 Foods to eat during this phase
          </Text>
        </TouchableOpacity>

        {/* Ask */}

        <Text style={styles.sectionTitle}>
          Ask Your Question
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Type your question..."
          value={question}
          onChangeText={setQuestion}
          multiline
        />

        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSend}
        >
          <Text style={styles.sendText}>
            Send
          </Text>
        </TouchableOpacity>

      </ScrollView>

      <BottomNavigation />

    </PhoneFrame>

  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#FFF8FB",
    paddingHorizontal:20,
    paddingTop:20,
  },

  heading:{
    fontSize:30,
    fontWeight:"700",
    color:"#EF4F8F",
  },

  subHeading:{
    color:"#777",
    fontSize:15,
    marginTop:6,
    marginBottom:20,
  },

  aiCard:{
    backgroundColor:"#FFF0F6",
    borderRadius:24,
    borderWidth:1,
    borderColor:"#FFD8E5",
    alignItems:"center",
    padding:22,
    marginBottom:28,
  },

  robot:{
    width:120,
    height:120,
    resizeMode:"contain",
    marginBottom:12,
  },

  greeting:{
    fontSize:24,
    fontWeight:"700",
    color:"#EF4F8F",
    marginBottom:8,
  },

  description:{
    textAlign:"center",
    fontSize:15,
    color:"#666",
    lineHeight:22,
  },

  sectionTitle:{
    fontSize:18,
    fontWeight:"700",
    color:"#444",
    marginBottom:14,
  },

  questionCard:{
    backgroundColor:"#FFFFFF",
    borderRadius:18,
    borderWidth:1,
    borderColor:"#FFD8E5",
    padding:16,
    marginBottom:12,
  },

  questionText:{
    fontSize:15,
    color:"#444",
  },

  input:{
    backgroundColor:"#FFFFFF",
    borderWidth:1,
    borderColor:"#FFD8E5",
    borderRadius:20,
    minHeight:120,
    padding:16,
    fontSize:16,
    textAlignVertical:"top",
    marginBottom:20,
  },

  sendButton:{
    backgroundColor:"#EF4F8F",
    height:55,
    borderRadius:28,
    justifyContent:"center",
    alignItems:"center",
    marginBottom:30,
  },

  sendText:{
    color:"#FFF",
    fontWeight:"700",
    fontSize:17,
  },

});