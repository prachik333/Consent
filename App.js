import React from 'react';
import { StyleSheet, View, Text, AsyncStorage,ImageBackground,TextInput,Image} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import IconEntypo from 'react-native-vector-icons/Entypo';



export default class TestView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
      loading: true,
      //To show the main page of the app
    };
  }

  _renderItem = ({ item }) => {
    return(
      <ImageBackground style={styles.container} source={require('./assets/consent.png')}>
        <View style={{position: 'relative',justifyContent: 'center', alignItems: 'center',marginVertical:400}}>
        <Text style={styles.text}>
           <Image source={require('./assets/18plus.png')} style={{width:90, height:80,resizeMode:'cover'}}/>
           {'\n'}
           <Text style={styles.text}>You should be 18+</Text>{'\n'}
           <Text style={styles.text1}>By continuing you agree{'\n'}to all {''}</Text>
           <Text style={styles.text2}>Terms and conditions{' '}</Text>
           <Text style={styles.text1}>of{'\n'}Boozingo.</Text>
        </Text>
        </View>
      </ImageBackground>
    );
  }
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <IconEntypo
          name="chevron-small-right" size={40}
        />
      </View>
    );
  };


  componentDidMount() {
    AsyncStorage.getItem('first_time').then((value) => {
      this.setState({ showRealApp: !!value, loading: false });
    });
  }

  _onDone = () => {
    // After user finished the intro slides. Show real app through
    // navigation or simply by controlling state
    AsyncStorage.setItem('first_time', 'true').then(() => {
      this.setState({ showRealApp: true });
        this.props.navigation.navigate('Home');
    });
  };

  render() {
    //If false show the Intro Slides
    if (this.state.showRealApp) {
      //Real Application
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 50,
          }}>
          <Text>
            This will be your screen when you click Done button 
          </Text>
        </View>
      );
    } else {
      //Intro slides
      return (
          <AppIntroSlider
            onDone={this._onDone}
            data={slides}
            renderItem={this._renderItem}
            renderDoneButton={this._renderDoneButton}

          />
      );
    }
  }
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      position: 'relative',
      resizeMode: 'cover'
    },
    buttonCircle: {
      width: 55,
      height: 55,
      backgroundColor: 'white',
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight:160,
      marginLeft:160,
      marginBottom:50 
    },
    text:{
      height:350, 
      width:300, 
      backgroundColor:'#ffffff',
      paddingHorizontal:20,
      borderRadius:30,
      fontWeight:"800",
      fontSize:25,
      paddingVertical:50,
      textAlign:'center',
      lineHeight:90
    },
    text1:{
      fontSize:15,
      textAlign:'center',
      lineHeight:20
    },
    text2:{
      fontSize:15,
      fontWeight:"bold",
      textAlign:'center',
      lineHeight:20
    }
  });

  const slides = [
    {
      key: 's1'
    }
  ];
  