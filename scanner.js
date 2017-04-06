import React, {Component} from 'react';
import {
  StyleSheet,
  AppRegistry,
  Text,
  TouchableOpacity,
  View,
  Image,
  NetInfo,
  Navigator,
  ListView,
  InteractionManager,
  TextInput,
  Alert,
  Dimensions,
  ScrollView,
  TouchableNativeFeedback,
  ToastAndroid,
  DatePickerAndroid,
  NativeModules,
  TouchableHighlight,
} from 'react-native';
var RNControlFlashlight = NativeModules.RNControlFlashlight;
import Icon from 'react-native-vector-icons/Ionicons';
import Barcode from 'react-native-smart-barcode';
import Webviewst from './Webviewst';
import scanner_info from './scanner_info';
export default class Netinfo extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
            viewAppear:false,
            light:true,
		};
	}

	componentDidMount() {
		 this.timer = setTimeout(
		    () => {  this.setState({viewAppear:true,})
		 },1000)
	}

	componentWillUnmount () {
        this.timer && clearTimeout(this.timer);
    }

    _pressButton() {
        const { navigator } = this.props;
        if(navigator) {

            navigator.pop();
                    }

    }

    on(){

    	this.setState({light:false,});
	    RNControlFlashlight.turnFlashlight(
	        "flashlightOn", // flashlightOn, flashlightOff
	        function errorCallback(results) {
	            console.log('JS Error: ' + results['errMsg']);
	        },
	        function successCallback(results) {
	            console.log('JS Success: ' + results['successMsg']);
	        }
	    );
	  }

	  off(){

	  	this.setState({light:true,});
	    RNControlFlashlight.turnFlashlight(
	        "flashlightOff", // flashlightOn, flashlightOff
	        function errorCallback(results) {
	            console.log('JS Error: ' + results['errMsg']);
	        },
	        function successCallback(results) {
	            console.log('JS Success: ' + results['successMsg']);
	        }
	    );
	  }

	_onBarCodeRead = (e) => {
        this._stopScan()
        if(e.nativeEvent.data.code.toLowerCase().indexOf("http://")!=-1 || e.nativeEvent.data.code.toLowerCase().indexOf("https://")!=-1 || e.nativeEvent.data.code.toLowerCase().indexOf("file://")!=-1){

        			var url=e.nativeEvent.data.code;
        			var { navigator } = this.props;
        			if(navigator) {
        				InteractionManager.runAfterInteractions(() => {
        				navigator.replace({
        					name: 'Webviewst',
        					component: Webviewst,
        					params: {
        						url: url
        					}
        				})
        				})
        			}
    		}else{
            var data=e.nativeEvent.data.code;
            var { navigator } = this.props;
            if(navigator) {
              InteractionManager.runAfterInteractions(() => {
              navigator.replace({
                name: 'scanner_info',
                component: scanner_info,
                params: {
                  data: data
                }
              })
              })
            }
      }
    }

    _startScan = (e) => {
        this._barCode.startScan()
    }

    _stopScan = (e) => {
        this._barCode.stopScan()
    }



	render() {
			return (
			  <View style={{flex: 1, backgroundColor: 'black',}}>
                {this.state.viewAppear ? <Barcode style={{flex: 1, }}
                                                  ref={ component => this._barCode = component }
                                                  onBarCodeRead={this._onBarCodeRead}/> : null}
                <View style={{flex:1,position:'absolute',top:0,left:0,height:65,paddingTop:20, flexDirection:'row',width:Dimensions.get('window').width,justifyContent:'space-between'}}>

                    <View style={{justifyContent:'center',alignItems:'center',}}>
                       <TouchableOpacity onPress={this._pressButton.bind(this)}>
                         <View style={{justifyContent:'flex-start',alignItems:'center',paddingLeft:0,backgroundColor:'transparent',flexDirection:'row'}}>
                           <Image source={require('./imgs/back.png')} style={{width: 25, height: 25,marginLeft:5,}} />
                           <Text style={{color:'white',fontSize:16,marginLeft:-5,}}allowFontScaling={false}>返回</Text>
                         </View>
                       </TouchableOpacity>
                    </View>
                    {this.state.light ? <TouchableOpacity activeOpacity={1} onPress={this.on.bind(this)} style={{justifyContent:'center',alignItems:'flex-end',paddingRight:25}}>
	                    <View style={{justifyContent:'center',alignItems:'flex-end',backgroundColor:'transparent'}}>
	                         <Icon name="ios-flash-outline" color="#fff"size={36}  />
	                    </View>
                    </TouchableOpacity> : <TouchableOpacity activeOpacity={1} onPress={this.off.bind(this)} style={{justifyContent:'center',alignItems:'flex-end',paddingRight:25}}>
	                    <View style={{justifyContent:'center',alignItems:'flex-end',backgroundColor:'transparent'}}>
	                         <Icon name="ios-flash-outline" color="#de9c0e"size={36}  />
	                    </View>
                    </TouchableOpacity>}
                </View>
              </View>
			)
	}
}
