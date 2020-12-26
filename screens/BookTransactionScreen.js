import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet,TextInput } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        hasCameraPermissions: null,
        scanned: false,
        scannedData: '',
        buttonState: 'normal'
      }
    }

    getCameraPermissions = async (ID) =>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      
      this.setState({
        /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
        hasCameraPermissions: status === "granted",
        buttonState: ID,
        scanned: false
      });
    }

    handleBarCodeScanned = async({type, data})=>{
      this.setState({
        scanned: true,
        scannedBookID:'',
        scannedStudentID:"",
        buttonState: 'normal'
      });
    }

    render() {
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;

      if (buttonState !== "normal" && hasCameraPermissions){
        return(
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        );
      }

      else if (buttonState === "normal"){
        return(
          <View style={styles.container}>
            <Image source={require("./asset/splash.png")} 
            style={{width:200,heigth:200}}></Image>
             <TextInput
             placeholder={'Book ID'}
             style={styles.inputbox}
             value={this.state.scannedBookID}></TextInput>

          <TouchableOpacity
            onPress={this.getCameraPermissions('BookID')}
            style={styles.scanButton}>
            <Text style={styles.buttonText}>Scan</Text>
          </TouchableOpacity>

          <TextInput
             placeholder={'Student ID'}
             style={styles.inputbox}
             value={this.state.scannedStudentID}></TextInput>

          <TouchableOpacity
            onPress={this.getCameraPermissions('StudentID')}
            style={styles.scanButton}>
            <Text style={styles.buttonText}>Scan</Text>
          </TouchableOpacity>

          <View style={styles.container}>
            <TouchableOpacity style={styles.scanButton}>
              <Text style={styles.displayText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
        );
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 20,
    },
    inputbox:{
      width:200,
      height:40,
      borderWidth:4,
      fontSize:20,
    }
  });