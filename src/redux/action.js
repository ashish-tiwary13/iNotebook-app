import React, { useState } from "react";
import AsyncStorage from '@react-native-community/async-storage';


const host = "https://inotebook-backend-ten.vercel.app";
export const login = (loginData) => {
  const { email, password } = loginData;

  return async (dispatch) => {
    try {
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();
      if(json.authToken){
        await AsyncStorage.setItem('authToken',json.authToken);
        await AsyncStorage.setItem("username",json.username);
        await AsyncStorage.setItem("emailId",json.emailId);
        await AsyncStorage.setItem('status',"success");
      }else{
        await AsyncStorage.setItem('status',"failed");
        console.log(json.error)
      }
      dispatch({ type: "LOGIN", payload: json });
    } catch (err) {
      console.log(err);
    }
  };
};

export const signUp = (credentials) => {
  const { name, email, password, confirmPassword } = credentials;
  return async (dispatch) => {
    try {
      if (confirmPassword === password) {
        const response = await fetch(`${host}/api/auth/createUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });
        const json = await response.json();
        // console.log("json");
        if(json.authToken){
        await AsyncStorage.setItem('authToken',json.authToken);
        await AsyncStorage.setItem("username",json.username);
        await AsyncStorage.setItem("emailId",json.emailId);
        await AsyncStorage.setItem('status',"success");
      }else{
        await AsyncStorage.setItem('status',"failed");
      }
        dispatch({ type: "SIGNUP", payload: json });
      }else{
        dispatch({ type: "SIGNUP", payload: {error: "Password and Confirm Password must be same"} });
      }
    } catch (error) {
      console.log(error);
    }
  };
};



//    Get all Note
export const getNotes = () => {
  return async (dispatch) => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');
      //  API Call
      const response = await fetch(`${host}/api/note/fetchallnote`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });
      const json = await response.json();
      dispatch({ type: "GETNOTES", payload: json });
    } catch (err) {
      console.log("err");
      console.log(err);
    }
  };
};

//    Add a Note
export const addNote =  (credentials) => {
  const {title, description, tag}=credentials;
  return async (dispatch) => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');
  //  API Call
  const response = await fetch(`${host}/api/note/addnote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": authToken,
    },

    body: JSON.stringify({ title, description, tag }),
  });
  const json = response.json();
  dispatch({ type: "ADDNOTE", payload: json });
    } catch (err) {
      console.log(err);
    }
  };
};


// Delete a note
export const deleteNote = ({id}) => {
  // API Call
  return async (dispatch) => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');

  const response = await fetch(`${host}/api/note/deletenote/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "auth-token": authToken,
    },
  });
  // eslint-disable-next-line
  const json = response.json();
  // console.log("deleted "+json)
  //
  const newNotes = notes.filter((note) => {
    return note._id !== id;
  });
  dispatch({ type: "DELETENOTE", payload: newNotes });
    } catch (err) {
      console.log(err);
    }
  };
};
// Edit a note
export const editNote =  (credentials) => {
  const {id, title, description, tag}=credentials;
  return async (dispatch) => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');
  // API Call
  const response = await fetch(`${host}/api/note/updatenote/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "auth-token": authToken,
    },

    body: JSON.stringify({ title, description, tag }),
  });
  // eslint-disable-next-line
  const json = response.json();
  for (let i = 0; i < notes.length; i++) {
    const element = notes[i];
    if (element._id === id) {
      element.title = title;
      element.description = description;
      element.tag = tag;
    }
  }
  dispatch({ type: "EDITNOTE", payload: json });
    } catch (err) {
      console.log(err);
    }
};
};
