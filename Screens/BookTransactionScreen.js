import React  from 'react';
import {Text,View,TouchableOpacity,StyleSheet} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
export default class TransactionScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal',
        }

    }
    getCameraPermissions = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermissions: status === 'granted' });
          
    }
    handleBarCodeScanned = async ({type,data}) => {
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal',
        })
    }
    render(){
        
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned=this.state.scanned;
        const buttonState=this.state.buttonState;
        if(buttonState==="clicked" & hasCameraPermissions){
            return(
                <BarCodeScanner 
                onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}/>
                    )
        }
        else if(buttonState==="normal"){
           
        return(
            <View style={styles.Container}>
                <Text style={styles.displayText}>{
                    hasCameraPermissions===true?this.state.scannedData:"Request Camera Permissions"} 
                     </Text>
                <TouchableOpacity 
                onPress={this.getCameraPermissions}
                style={styles.ScanButton}> 
                    <Text style={styles.ButtonText}> Scan QR Code</Text>
                    </TouchableOpacity>
            </View>
        );
                }
    }
}
const style= StyleSheet.create({
Container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    alignText:'center',

},
displayText:{
    fontSize:25,
    textDecorationLine:'underline',

},
ScanButton:{
    backgroundColor:'green',
    margin:10,
    padding:10,
},
})

