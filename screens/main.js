import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Platform, Image, ScrollView, TouchableWithoutFeedbackBase } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as FaceDetector from 'expo-face-detector';

export default class Main extends Component{
    constructor(props){
      super(props);
      this.state={
        hasCameraPermission:null,
        faces:[]
      };
      this.onFacesDetected=this.onFacesDetected.bind(this)
    };

async componentDidMount(){
    const {status}=await Camera.requestPermissionAsync();
    this.setState({hasCameraPermission: status==="granted"})
};

onFaceDetected=(MyFace)=>{
    this.setState({
      faces:MyFace,
    })
  };

  onFaceDetectionError=(error)=>{
    console.log(error)
  };

render(){
    if(this.state.hasCameraPermission===null){
      return(<View></View>)
    }
    if(this.state.hasCameraPermission===false){
      return(
        <View>
          <Text>Camera permissions not allowed</Text>
        </View>  
      )
    }
};

return(
    <View style={styles.middleContainer}>
        <Camera
        style={{flex:1}}
        type:{Camera.Constants.Type.Front}
        FaceDetectorSettings={{
            mode:FaceDetector.Constants.Mode.fast,
            detectLandmarks:FaceDetector.Constants.Landmarks.all,
            runClassifications:FaceDetector.Constants.Classfications.all
        }}
        onFacesDetected={this.onFacesDetected}
        onFaceDetectionError={this.onFaceDetectionError}
        />
    </View>
);

const styles= StyleSheet.create({
    appName:{
        flex:0.1,
        backgroundColor:cyan
    },
    cameraSection:{
        flex:0.65,
    },
    actionSection:{
        backgroundColor:TouchableWithoutFeedbackBase,
        flex:1
    }
})

  

