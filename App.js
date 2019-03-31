// don't forget to do npm install --save react-navigation
//npm install react-native-maps --save
//npm install react-native-swiper --save
//npm install geolib
//npm install react-native-communications
//npm install --save firebase
import React from 'react';
import { Button, View, Text, TouchableOpacity, Image, TextInput,FlatList,StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import { StackNavigator } from 'react-navigation';
import Swiper from 'react-native-swiper';
import geolib from 'geolib';
import Communications from 'react-native-communications';
import * as firebase from 'firebase';





var config = {
  apiKey: "AIzaSyBwksCkrBqNjgmYmcWJ1axv-VvYt7CGpck",
  authDomain: "my-project-1523780937798.firebaseapp.com",
  databaseURL: "https://my-project-1523780937798.firebaseio.com",
  projectId: "my-project-1523780937798",
  storageBucket: "my-project-1523780937798.appspot.com",
  messagingSenderId: "129072897072"
};
firebase.initializeApp(config);




class HomeScreen extends React.Component {

  state = {
    open: false,
    id:'id',
    pass:'password',
    
  };
 

  static navigationOptions = {
    title: 'Home',
    headerStyle: {
    backgroundColor: 'white',borderBottomColor: 'transparent',height:0
    },
    headerTintColor: 'white'
    
    };

  render() {
    return (
      <View style={{ flex: 1,backgroundColor:'white' }}>
        <View style={{flex:1,backgroundColor:'white' ,justifyContent:'center',alignItems:'center',paddingTop:15,}}>
          <Image style={{aspectRatio:0.58,resizeMode:'contain',alignItems:'center'}} source={require('./logo.jpg')}/>
        </View>
        <View style={{justifyContent:'center',flex:1,backgroundColor:'#F36523',alignItems:'center'}}>
          <View style={{flexDirection:'column'}}>
            <View>
                <TouchableOpacity style={{ backgroundColor: 'black',padding: 10,borderWidth: 1,borderRadius: 30,width:200
                  }}
                  onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    this.props.navigation.navigate('SignUppage');
                  }}
                >
              
                  <Text style={{textAlign:'center',color:'#F36523'}}>Sign up</Text>
                </TouchableOpacity>
              </View>
              <View style={{paddingTop:10,paddingBottom:10}}>
                <TouchableOpacity style={{ backgroundColor: 'black',padding: 10,borderWidth: 1,borderRadius: 30,width:200
                  }}
                  onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    this.props.navigation.navigate('SignInpage', {
                      
                    });
                  }}
                >
                  <Text style={{textAlign:'center',color:'#F36523'}}>Sign in</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={{ backgroundColor: 'black',padding: 10,borderWidth: 1,borderRadius: 30,width:200
                  }}
                  onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    this.props.navigation.navigate('Main', {
                      
                    });
                  }}
                >
                  <Text style={{textAlign:'center',color:'#F36523'}}>Continue without sign in</Text>
                </TouchableOpacity>
              </View>

           </View>
          </View>

          

      </View>
    );
  }
}

class MainScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mapRegion: { latitude: 13.78825, longitude: 100.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
      locationResult: null,
      location: {coords: { latitude: 13.78825, longitude: 100.4324}},
      error:null,
      mapType:'standard',
      x:0,
      mapTypename:'Hybrid',
      shopdatabase:[],
      towcardatabase:[],
      slidecardatabase:[],
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    //this.componentWillMount = this.componentWillMount.bind(this);
  }

  
    
  

  static navigationOptions = {
    title: 'MainScreen',
    headerStyle: {
      backgroundColor: 'white',borderBottomColor: 'transparent',
      },
      headerTintColor: '#F36523'
  };

  componentDidMount() {

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          location:{coords:{ latitude:position.coords.latitude,longitude:position.coords.longitude}},
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 4000, maximumAge: 10000 },
    );  
    navigator.geolocation.stopObserving();


    firebase.database().ref('carservice').once('value', (snapshot)=>{
      this.setState({
        shopdatabase:snapshot.val()
      })
     // console.log(this.state.shopdatabase)
    });
    firebase.database().ref('towcar').once('value', (snapshot)=>{
      this.setState({
        towcardatabase:snapshot.val()
      })
     // console.log(this.state.towcardatabase)
    });
    firebase.database().ref('slidecar').once('value', (snapshot)=>{
      this.setState({
        slidecardatabase:snapshot.val()
      })
      //console.log(this.state.slidecardatabase)
    });



  }
  // componentWillMount(){
  //   firebase.database().ref('carservice').once('value', (snapshot)=>{
  //     this.setState({
  //       shopdatabase:snapshot.val()
  //     })
  //    // console.log(this.state.shopdatabase)
  //   });
  //   firebase.database().ref('towcar').once('value', (snapshot)=>{
  //     this.setState({
  //       towcardatabase:snapshot.val()
  //     })
  //    // console.log(this.state.towcardatabase)
  //   });
  //   firebase.database().ref('slidecar').once('value', (snapshot)=>{
  //     this.setState({
  //       slidecardatabase:snapshot.val()
  //     })
  //     //console.log(this.state.slidecardatabase)
  //   });
    
    
  // }

  _handleMapRegionChange = mapRegion => {
    this.setState({
      mapRegion: { 
        latitude: this.state.location.coords.latitude,
        longitude: this.state.location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421 }
      });
    
  };
  _handleMapTypeChange = mapType => {
    if(this.state.x==0){
      this.setState({
        mapType:'hybrid',
        mapTypename:'Standard',
        x:1
      })
      
    }
    else{
      this.setState({
        mapType:'standard',
        mapTypename:'Hybrid',
        x:0
      })
      
    }
    
  };

  

  render() {
    
    return (
      
      <View style={{flex:1,backgroundColor:'white'}}>
          <View style={{flex:4,}}>
                <MapView
                  style={{flex:1,alignItems:'center'}}
                  region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0622, longitudeDelta: 0.0321 }}
                  //onRegionChange={this._handleMapRegionChange}
                  showsUserLocation={true}
                  mapType={this.state.mapType}
                >
                    {this.state.shopdatabase.map(shop => (
                      <MapView.Marker 
                        image={require('./b.png') }
                        key={shop.key}
                        coordinate={shop.coordinates}
                        title={shop.title}
                        //pinColor={shop.color}
                      />
                      
                    ))}  

                    {this.state.towcardatabase.map(shop => (
                      <MapView.Marker 
                       image={require('./d.png') }
                        key={shop.key}
                        coordinate={shop.coordinates}
                        title={shop.title}
                        //pinColor={'red'}
                      />
                      
                    ))}

                    {this.state.slidecardatabase.map(shop => (
                      <MapView.Marker 
                       image={require('./e.png') }
                       key={shop.key}
                        coordinate={shop.coordinates}
                        title={shop.title}
                       // pinColor={'blue'}
                      />
                      
                    ))}
                             
                </MapView>
          </View>
          
          <View style={{flex:1,backgroundColor:'white'}}>
                {
                  //choices to selected
                  //<Text style={{textAlign:'center'}}>MENU</Text>
                }
            <View style={{flex:2,flexDirection:'row',padding:5}}>
                <View style={{flex:1,paddingRight:5}}>
                  <TouchableOpacity style={{backgroundColor:'#F36523',alignItems:'center',justifyContent:'center',borderRadius:30,flex:1,}}
                  onPress={() => {
                  this.props.navigation.navigate('Towcarservice', {
                     location: this.state.location,
                     towcardatabase:this.state.towcardatabase,
                     slidecardatabase:this.state.slidecardatabase
                  });
                }}
                  >
                      <Text style={{color:'white'}}>Tow car service</Text>
                  </TouchableOpacity>
                </View>
                <View style={{flex:1}}>
                  <TouchableOpacity style={{backgroundColor:'#F36523',alignItems:'center',justifyContent:'center',borderRadius:30,flex:1,}}
                  onPress={() => {
                  this.props.navigation.navigate('Carservice', {
                     location: this.state.location,
                     shopdatabase:this.state.shopdatabase
                  });
                }}>
                      <Text style={{color:'white'}}>Car services</Text>
                  </TouchableOpacity>
                </View>
            </View>

            <View style={{flex:1,flexDirection:'row',padding:5,borderTopWidth:1,borderColor:'#F36523'}}>
                <View style={{flex:1,paddingRight:5}}>
                  <TouchableOpacity style={{alignItems:'center',justifyContent:'center',flex:1,}} onPress={this._handleMapRegionChange}>
                  <Image style={{width:30,height:30}} source={require('./pointer.png')}/>
                  </TouchableOpacity>
                </View>
                <View style={{flex:2,}}>
                  <TouchableOpacity style={{borderColor:'#F36523',borderWidth:1,alignItems:'center',justifyContent:'center',borderRadius:30,flex:1,}}onPress={this._handleMapTypeChange}>
                      <Text style={{color:'#F36523'}}>{this.state.mapTypename}</Text>
                  </TouchableOpacity>
                </View>
                <View style={{flex:3,justifyContent:'center',alignItems:'center'}}>
                  <Text style={{color:'#F36523'}}>{this.state.location.coords.latitude.toFixed(3)},{this.state.location.coords.longitude.toFixed(3)}</Text>
                </View>
            </View>
            

          </View>
      </View>
      
    );
  }
}

class Carservice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lock: 0,
      dataToShow :[],
    }
    this._handle = this._handle.bind(this);
  }

  
  static navigationOptions = {
    title: 'Carservice',
    headerStyle: {
    backgroundColor: 'white',
    borderBottomColor: 'transparent'
    //backgroundColor: 'white',borderBottomColor: 'transparent',height:0
    },
    headerTintColor: '#F36523'
    
    };

  _handle(){
     if(this.state.lock==0){
       this.setState({lock:1})
        const { params } = this.props.navigation.state;
        const location = params ? params.location : null;
        const shopdatabase = params ? params.shopdatabase : null;
        let currentla = location.coords.latitude
        let currentlong = location.coords.longitude

        let distanceConvert;
        let distancenotConvert;
        for (let k = 0; k < Object.keys(shopdatabase).length; k++){
          let objlatitude = shopdatabase[k].coordinates.latitude
          let objlongitude = shopdatabase[k].coordinates.longitude
          var distance = geolib.getDistance({latitude: currentla,longitude: currentlong}, {
            latitude: objlatitude,
            longitude: objlongitude
          })
        //console.log(distance)
          if(distance>=1000){
            distanceConvert = (distance*0.001).toFixed(2)+'km';
            //console.log(distanceConvert)
          }
          else{
            distanceConvert = distance+'m'
          }
            
            distancenotConvert = distance
            let imgURI = 'https:';
            let sidepic1URI = 'https:';
            let sidepic2URI = 'https:';
            imgURI += shopdatabase[k].imgSource;
            sidepic1URI += shopdatabase[k].sidepic1;
            sidepic2URI += shopdatabase[k].sidepic2;
            new_obj = {
              //key: shop[k].key,
              title:shopdatabase[k].title,
              //color:shop[k].color,
              sidepic1:{uri:sidepic1URI},
              sidepic2:{uri:sidepic2URI}, 
              imgSource: {uri: imgURI},
              D_between_currentlocation: distanceConvert,
              distancenotConvert:distancenotConvert,
              tel:shopdatabase[k].tel,
              locationname:shopdatabase[k].locationname,
              detail1:shopdatabase[k].detail1
              
            };
          this.state.dataToShow.push(new_obj);
      // console.log(this.state.dataToShow)
        }
          for(let p1 =0; p1< this.state.dataToShow.length;p1++){
            this.state.dataToShow.sort(function(a, b){
              return a.distancenotConvert-b.distancenotConvert
            })
          }
      }
  }
  render() {
    this._handle()
   // const { params } = this.props.navigation.state;
   // const locationname = params ? params.locationname : null;

    return ( 

      <View style={{flex:1}}>
           <FlatList
          data = {this.state.dataToShow}
          style={{marginTop:20,marginBottom:10,marginLeft:10,marginRight:10,}}
          renderItem = { ({item}) => {
              return(
                <TouchableOpacity  onPress={() => {
                  this.props.navigation.navigate('Detailspage', {
                     sidepic1: item.sidepic1,
                     sidepic2: item.sidepic2,
                     imgSource: item.imgSource,
                     tel:item.tel,
                     locationname:item.locationname,
                     detail1:item.detail1
                    
                  });
                }}>
                  <View style={{height:200,paddingBottom:20,flexDirection: 'row',flex: 1}}>
                    <View style={{flex:1}}>
                      <Image resizeMode="cover" style={{position: 'absolute',top: 0,left: 0,bottom: 0,right: 0,}} source={item.imgSource}/>
                    </View>
                    <View style={{flex:2,backgroundColor:'white'}}>
                      <View style={{borderBottomColor:'#F36523',borderBottomWidth:1,flex:3}}>
                        <Text style={{fontSize: 30,justifyContent:'center',alignItems:'center',paddingLeft:5,paddingTop:10,fontWeight:'bold'}}>
                            {item.title}
                        </Text>
                        <Text style={{color:'#b5b5b5', padding:10}}>{item.locationname}</Text>
                        
                      </View>
                      <Text style={{color:'#F36523', fontSize:12,paddingLeft:5}}>Distance from current location:</Text>
                      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',flex:1}}>
                          <Text style={{fontSize: 14,color:'#F36523',fontWeight:'bold'}}>
                            {item.D_between_currentlocation}{" "}
                          </Text>
                          <Text style={{fontSize: 14,}}>
                            left
                          </Text>
                      </View>
                    </View>
                  </View>
                  
                </TouchableOpacity>
                  
              );
                  
            }
          }
        />
                    
      </View>

      
      
    );
  }
}

class Towcarservice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {coords: { latitude: 0, longitude: 0}},
      towcardatabase:[],
      slidecardatabase:[],
      
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  

  static navigationOptions = {
    title: 'Select Helper',
    headerStyle: {
    backgroundColor: 'white',
    borderBottomColor: 'transparent'
    //borderBottomColor: 'transparent',height:0
    },
    headerTintColor: '#F36523'
    
    };
    componentDidMount(){
      const { params } = this.props.navigation.state;
      const location = params ? params.location : null;
      const towcardatabase = params ? params.towcardatabase : null;
      const slidecardatabase = params ? params.slidecardatabase : null;
      this.setState({
        location:location,
        towcardatabase:towcardatabase,
        slidecardatabase:slidecardatabase,
        
      })
    }
    render() {
    
      return (
        
        <View style={{flex:1,padding: 8,backgroundColor:'white'}}>
          <TouchableOpacity style={{flex:10,borderRadius:20,backgroundColor:'#F36523',justifyContent:'center',alignItems:'center'}} 
          onPress={() => {this.props.navigation.navigate('TowDetail',{
            location:this.state.location,
            towcardatabase:this.state.towcardatabase,
            
          });}}>
            <Image source={require('./d150.png')} />
            <Text style={{color:'white',fontWeight:'bold'}}>Tow Car</Text>
          </TouchableOpacity>
          <View style={{flex:1}}></View>
          <TouchableOpacity style={{flex:10,borderRadius:20,backgroundColor:'black',justifyContent:'center',alignItems:'center'}}
          onPress={() => {this.props.navigation.navigate('SlideDetail',{
            location:this.state.location,
            slidecardatabase:this.state.slidecardatabase,
          });}}>
            <Image source={require('./E2.png')} />
            <Text style={{color:'white',fontWeight:'bold'}}>Slide Car</Text>
          </TouchableOpacity>
        </View>

      );
    }
    
}

class Detailspage extends React.Component {

  static navigationOptions = {
    title: 'Detailpage',
    headerStyle: {
    backgroundColor: 'white',
    borderBottomColor: 'transparent'
    //backgroundColor: 'white',borderBottomColor: 'transparent',height:0
    },
    headerTintColor: '#F36523'
    
    };
    

  
    render() {
      const { params } = this.props.navigation.state;
      const sidepic1 = params ? params.sidepic1 : null;
      const sidepic2 = params ? params.sidepic2 : null;
      const imgSource = params ? params.imgSource : null;
      const tel = params ? params.tel : null;
      const locationname = params ? params.locationname : null;
      const detail1 = params ? params.detail1 : null;
     
    
      return (
        
        <View style={{flex:1}}>
          <View style={{flex:4}}> 
            <Swiper style={styles.wrapper}  autoplay={true} activeDot = {<View style={{
                backgroundColor: '#F36527',
                width: 8, height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3,}} />}
                showsButtons={false}
            >
            <View style={styles.slide}>
              {/* <Text style={styles.text}>Hello Swiper</Text> */}
              <Image resizeMode="contain" style={{position: 'absolute',top: 0,left: 0,bottom: 0,right: 0,}} source={imgSource} />
            </View>
            <View style={styles.slide}>
              <Image resizeMode="contain" style={{position: 'absolute',top: 0,left: 0,bottom: 0,right: 0,}} source={sidepic1} />
            </View>
            <View style={styles.slide}>
               <Image resizeMode="contain" style={{position: 'absolute',top: 0,left: 0,bottom: 0,right: 0,}} source={sidepic2} />
            </View>
          </Swiper>
          </View>
          <View style={{flex:5,padding:15}}>
              <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <View style={{flex:1}}>
                  <Image  source={require('./lo.png')} />
                </View>
                <View style={{flex:3}}>
                  <Text style={{color:'#F36527'}}>{locationname}</Text>
                </View>
              </View>
              <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <View style={{flex:1}}>
                  <Image  source={require('./de.png')} />
                </View>
                <View style={{flex:3}}>
                  <Text style={{color:'#F36527'}}>{detail1}</Text>
                </View>
              </View>
              
              
          </View>
          <TouchableOpacity  
            onPress={() => {Communications.phonecall(tel, true)}} 
            style={{flex:1,backgroundColor:'#F36527',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>

              <Image source={require('./phone.png')}/>
              <Text style={{color:'white',fontWeight:'bold',padding:2}}>
                            Call now
              </Text>

          </TouchableOpacity>
        </View>

      );
    }

}

class TowDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {coords: { latitude: 13.78825, longitude: 100.4324}},
      dataToShow:[],
      lock:0
    }
  }
 
  
  static navigationOptions = {
    title: 'Towcarservice',
    headerStyle: {
    backgroundColor: 'white',
    borderBottomColor: 'transparent'
    //borderBottomColor: 'transparent',height:0
    },
    headerTintColor: '#F36523'
  };
  


    
  _handle2(){
    if(this.state.lock==0){
      this.setState({lock:1,})
      const { params } = this.props.navigation.state;
      const location = params ? params.location : null;
      const towcardatabase = params ? params.towcardatabase : null;
      let currentla = location.coords.latitude
      let currentlong = location.coords.longitude

      let distanceConvert;
      let distancenotConvert;
      for (let k = 0; k < Object.keys(towcardatabase).length; k++){
        let objlatitude = towcardatabase[k].coordinates.latitude
        let objlongitude = towcardatabase[k].coordinates.longitude
        var distance = geolib.getDistance({latitude: currentla,longitude: currentlong}, {
          latitude: objlatitude,
          longitude: objlongitude
        })
        //console.log(distance)
        if(distance>=1000){
          distanceConvert = (distance*0.001).toFixed(2)+'km';
          //console.log(distanceConvert)
        }
        else{
          distanceConvert = distance+'m'
        }
          
          distancenotConvert = distance
          let imgURI = 'https:';
          let sidepic1URI = 'https:';
          let sidepic2URI = 'https:';
          
          imgURI += towcardatabase[k].imgSource;
          sidepic1URI += towcardatabase[k].sidepic1;
          sidepic2URI += towcardatabase[k].sidepic2;
          new_obj = {
            //key: towcardatabase[k].key,
            title:towcardatabase[k].title,
            //color:towcardatabase[k].color,
            //sidepic1:{uri:sidepic1URI},
            //sidepic2:{uri:sidepic2URI}, 
            imgSource: {uri: imgURI},
            D_between_currentlocation: distanceConvert,
            distancenotConvert:distancenotConvert,
            tel:towcardatabase[k].tel
            
          };
          this.state.dataToShow.push(new_obj);
          // console.log(this.state.dataToShow)
        }
        for(let p1 =0; p1< this.state.dataToShow.length;p1++){
          this.state.dataToShow.sort(function(a, b){
            return a.distancenotConvert-b.distancenotConvert
          })
        }
      }
  }
    
    render() {
      
      this._handle2()
     
    
      return (
        
        <View style={{flex:1,}}>
          <FlatList
          data = {this.state.dataToShow}
          renderItem = { ({item}) => {
              return(
                
                  <View style={{margin: 8,height:200,paddingBottom:20,flexDirection: 'row',flex: 1}}>
                    <TouchableOpacity style={{flex:1,backgroundColor:'white'}}
                      onPress={() => {this.props.navigation.navigate('Imagezoom',{
                        imgSource:item.imgSource
                      });}}>
                      <Image resizeMode="contain" style={{position: 'absolute',top: 0,left: 0,bottom: 0,right: 0,}} source={item.imgSource}/>
                    </TouchableOpacity>
                    <View style={{flex:2,backgroundColor:'white',padding:5}}>
                      <View style={{flex:2,justifyContent:'center',alignItems:'center',padding: 10,borderBottomColor:'#F36523',borderBottomWidth:1}}>
                        <Text style={{fontSize: 20,}}>
                          {item.title}
                        </Text>
                      </View>
                      <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',padding: 10}}>
                        <Text style={{fontSize: 14 ,color:'#f5834e',fontWeight:'bold'}}>
                          {item.D_between_currentlocation}{" "}
                        </Text>
                        <Text style={{fontSize: 14}}>
                          left
                        </Text>
                      </View>
                      <TouchableOpacity  onPress={() => {Communications.phonecall(item.tel, true)}}
                      style={{flex:1,flexDirection:'row',borderRadius:30,backgroundColor:'#F36523',justifyContent:'center',alignItems:'center',padding: 10}}>
                        <Image source={require('./phone.png')}/>
                        <Text style={{color:'white',fontWeight:'bold',padding:2}}>
                            Call now
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  
                
                  
              );
              
            }
          }
        />
        </View>

      );
    }
    
}

class SlideDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {coords: { latitude: 13.78825, longitude: 100.4324}},
      dataToShow:[],
      lock:0
    }
  }
  

  static navigationOptions = {
    title: 'SlideDetail',
    headerStyle: {
    backgroundColor: 'white',
    borderBottomColor: 'transparent'
    //borderBottomColor: 'transparent',height:0
    },
    headerTintColor: '#F36523'
    
    };
    _handle2(){
      if(this.state.lock==0){
        this.setState({lock:1,})
        const { params } = this.props.navigation.state;
        const location = params ? params.location : null;
        const slidecardatabase = params ? params.slidecardatabase : null;
        let currentla = location.coords.latitude
        let currentlong = location.coords.longitude
    
        let distanceConvert;
        let distancenotConvert;
        for (let k = 0; k < Object.keys(slidecardatabase).length; k++){
          let objlatitude = slidecardatabase[k].coordinates.latitude
          let objlongitude = slidecardatabase[k].coordinates.longitude
          var distance = geolib.getDistance({latitude: currentla,longitude: currentlong}, {
            latitude: objlatitude,
            longitude: objlongitude
          })
        //console.log(distance)
          if(distance>=1000){
            distanceConvert = (distance*0.001).toFixed(2)+'km';
            //console.log(distanceConvert)
          }
          else{
            distanceConvert = distance+'m'
          }
            
            distancenotConvert = distance
            let imgURI = 'https:';
            let sidepic1URI = 'https:';
            let sidepic2URI = 'https:';
            imgURI += slidecardatabase[k].imgSource;
            sidepic1URI += slidecardatabase[k].sidepic1;
            sidepic2URI += slidecardatabase[k].sidepic2;
            new_obj = {
              //key: slidecar[k].key,
              title:slidecardatabase[k].title,
              //color:slidecar[k].color,
              //sidepic1:{uri:sidepic1URI},
              //sidepic2:{uri:sidepic2URI}, 
              imgSource: {uri: imgURI},
              D_between_currentlocation: distanceConvert,
              distancenotConvert:distancenotConvert,
              tel:slidecardatabase[k].tel
              
            };
          this.state.dataToShow.push(new_obj);
        // console.log(this.state.dataToShow)
        }
          for(let p1 =0; p1< this.state.dataToShow.length;p1++){
            this.state.dataToShow.sort(function(a, b){
              return a.distancenotConvert-b.distancenotConvert
            })
          }
        }
    }
    render() {
      
      this._handle2()
    
      return (
        
        <View style={{flex:1,}}>
          <FlatList
          data = {this.state.dataToShow}
          renderItem = { ({item}) => {
              return(
                
                  <View style={{margin: 8,height:200,paddingBottom:20,flexDirection: 'row',flex: 1}}>
                    <TouchableOpacity style={{flex:1,backgroundColor:'white'}}
                      onPress={() => {this.props.navigation.navigate('Imagezoom',{
                        imgSource:item.imgSource
                      });}}>
                      <Image resizeMode="contain" style={{position: 'absolute',top: 0,left: 0,bottom: 0,right: 0,}} source={item.imgSource}/>
                    </TouchableOpacity>
                    <View style={{flex:2,backgroundColor:'white',padding:5}}>
                      <View style={{flex:2,justifyContent:'center',alignItems:'center',padding: 10,borderBottomColor:'#F36523',borderBottomWidth:1}}>
                        <Text style={{fontSize: 20,}}>
                          {item.title}
                        </Text>
                      </View>
                      <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',padding: 10}}>
                        <Text style={{fontSize: 14 ,color:'#f5834e',fontWeight:'bold'}}>
                          {item.D_between_currentlocation}{" "}
                        </Text>
                        <Text style={{fontSize: 14}}>
                          left
                        </Text>
                      </View>
                      <TouchableOpacity  onPress={() => {Communications.phonecall(item.tel, true)}}
                      style={{flex:1,flexDirection:'row',borderRadius:30,backgroundColor:'#F36523',justifyContent:'center',alignItems:'center',padding: 10}}>
                        <Image source={require('./phone.png')}/>
                        <Text style={{color:'white',fontWeight:'bold',padding:2}}>
                            Call now
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  
                
                  
              );
                  
            }
          }
        />
        </View>

      );
    }
    
}

class SignUppage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      toggle:false,
      togglestatus: 'Disagree',
      signupButton : " ",   
    }
    this._toggleSwitch = this._toggleSwitch.bind(this);
    this.register = this.register.bind(this);
  }

  static navigationOptions = {
    title: 'SignUppage',
    headerStyle: {
    backgroundColor: 'white',
    borderBottomColor: 'transparent'
    //backgroundColor: 'white',borderBottomColor: 'transparent',height:0
    },
    headerTintColor: '#F36523'
    
  };

  componentDidMount() {
    this.listenForAuthChange();
  }

  register() {
    console.log(this.state.email, this.state.password);
    firebase.auth().createUserWithEmailAndPassword(this.state.email,
      this.state.password).then((user) => {
        console.log("Created user successfully");
    }).catch((error) => {
      alert("An error occured: " + error.message);
      console.log('An error occured', error.message);
    });
  }
  

  listenForAuthChange() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log("auth changed");
      if (user) {
        console.log('User details', user);
        this.setState({name: user.email})
      } 
      else {
        console.log("no one is signed in ");
        this.setState({
          username: 'Anonymous',
        });
      }
    });
  }


  _toggleSwitch(){
    const newState = !this.state.toggle;
    const onSignUp = !this.state.signupbutton;

    if(newState){
      this.setState({
        toggle:newState,
        togglestatus:'Agree',
        signupButton : "Sign Up!"
      })   
    }else{
      this.setState({
        toggle:newState,
        togglestatus:'Disagree',
        signupButton : ""
      })
    }
  }

  render() {
    const{signupButton} =this.state;
    const{toggle} = this.state;

    return (
      <View style={{flex:1,backgroundColor:'white'}}>
        <View style ={{margin:10}}>

          <Text style={{fontSize: 20, paddingBottom:10, paddingTop: 20}}>Email</Text> 
          <TextInput keyboardType="email-address" autoCapitalize="none"
            style={{borderWidth:1, padding:10, borderColor: '#b0b0b0', borderRadius:5}}
            value={this.state.email}
            placeholder ="Email"  
            onChangeText={(t) => this.setState({email: t})}>
          </TextInput>
          {/* <TextInput
            style = {{borderWidth:1, padding:10, borderColor: '#b0b0b0', borderRadius:5}} 
            placeholder ="Email"          
          /> */}

          {/* <Text style={{fontSize: 20, paddingBottom:10, paddingTop: 20}}>Username</Text> 
          <TextInput
            style = {{borderWidth:1, padding:10, borderColor: '#b0b0b0', borderRadius:5}} 
            placeholder ="Username"
          /> */}

          <Text style={{fontSize: 20, paddingBottom:10, paddingTop: 20}}>Password</Text> 
          <TextInput 
            secureTextEntry={true} 
            style={{borderWidth:1, padding:10, borderColor: '#b0b0b0', borderRadius:5}}
            value={this.state.password}
            placeholder ="Password"
            onChangeText={(t) => this.setState({password: t})}>
          </TextInput>
          {/* <TextInput
            style = {{borderWidth:1, padding:10, borderColor: '#b0b0b0', borderRadius:5}} 
            placeholder ="Password"
          /> */}

          <Text style={{fontSize: 20, paddingBottom:10, paddingTop: 20}}>Term of Agreement: {this.state.togglestatus}</Text> 
          <TouchableOpacity
          onPress={()=>this._toggleSwitch()}
          style ={{justifyContent:'center', height:50,width:100, borderRadius:10, borderWidth:1,borderColor:'#b0b0b0'}}
          >
            <Text style ={{textAlign : 'center', color: 'dodgerblue',fontSize: 20}}>
              {this.state.togglestatus}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
          // onPress={this.register()}
          onPress={() => {
            this.register()
            this.props.navigation.navigate('SignInpage')}
          }
          style ={{justifyContent:'center',padding: 60}}
          >
            <Text style ={{textAlign : 'center', color: 'dodgerblue',fontSize: 20}}>
              {this.state.signupButton}
            </Text>  
          </TouchableOpacity> 

        </View>       
      </View>
    );
  }
} 

class SignInpage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      toggle:false,
      togglestatus: 'Disagree',
      signupButton : " ",   
    }
    
    this.login = this.login.bind(this);
  }
  
  static navigationOptions = {
    title: 'SignInpage',
    headerStyle: {
    backgroundColor: 'white',
    borderBottomColor: 'transparent'
    //backgroundColor: 'white',borderBottomColor: 'transparent',height:0
    },
    headerTintColor: '#F36523'
    
  };

  componentDidMount() {
    this.listenForAuthChange();
  }
 
  login() {
    firebase.auth().signInWithEmailAndPassword(this.state.email, 
      this.state.password).then((user) => {
        console.log("Login user successfully");
        console.log(user);
      }).catch((error) => {
        alert("An error occured: " + error.message);
        console.log('An error occured', error.message);
    });
  }

  listenForAuthChange() {
      firebase.auth().onAuthStateChanged((user) => {
        console.log("auth changed");
        if (user) {
          console.log('User details', user);
          this.setState({name: user.email})
        } 
        else {
          console.log("no one is signed in ");
          this.setState({
            username: 'Anonymous',
          });
        }
      });
    }
  render() {
  

    return (
      <View style={{flex:1,backgroundColor:'white'}}>
        <View style ={{margin:10}}>

          <Text style={{fontSize: 20, paddingBottom:10, paddingTop: 20}}>Email</Text> 
          <TextInput keyboardType="email-address" autoCapitalize="none"
            style={{borderWidth:1, padding:10, borderColor: '#b0b0b0', borderRadius:5}}  
            value={this.state.email}
            placeholder ="example@gmail.com"
            onChangeText={(t) => this.setState({email: t})}>
          </TextInput>
          {/* <TextInput
            style = {{borderWidth:1, padding:10, borderColor: '#b0b0b0', borderRadius:5}} 
            placeholder ="Username"
          /> */}

          <Text style={{fontSize: 20, paddingBottom:10, paddingTop: 20}}>Password</Text> 
          <TextInput secureTextEntry={true} 
            style={{borderWidth:1, padding:10, borderColor: '#b0b0b0', borderRadius:5}} 
            value={this.state.password}
            placeholder ="Password"
            onChangeText={(t) => this.setState({password: t})}>
          </TextInput>
          {/* <TextInput
            style = {{borderWidth:1, padding:10, borderColor: '#b0b0b0', borderRadius:5}} 
            placeholder ="Password"
          /> */}

          <TouchableOpacity
            onPress={() => {
              this.login()
              this.props.navigation.navigate('Main')}
            }
            style ={{justifyContent:'center',}}
          >
            <Text style ={{textAlign : 'center', color: 'dodgerblue',padding:30,fontSize: 25}}>
             Sign In
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.submitButton} onPress={this.login}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity> */}

        </View>   
      </View>     
    );
  }
} 

class Imagezoom extends React.Component {
  
  static navigationOptions = {
    title: 'Imagezoom',
    headerStyle: {
    backgroundColor: 'white',
    borderBottomColor: 'transparent'
    //borderBottomColor: 'transparent',height:0
    },
    headerTintColor: '#F36523'
  };
  
    render() {
      const { params } = this.props.navigation.state;
      const imgSource = params ? params.imgSource : null;
      return (
        <View style={{flex:1,}}>
            <Image resizeMode="contain" style={{position: 'absolute',top: 0,left: 0,bottom: 0,right: 0,}} source={imgSource}/>
        </View>
      );
    } 
}





const styles = StyleSheet.create({
  wrapper: {
  },
  slide: {
    flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
    backgroundColor: '#F36523',
  },
})

const RootStack = StackNavigator(
  {
    Home: {screen: HomeScreen, 
     
    },
    Main: {
      screen: MainScreen,
    },
    Carservice: {
      screen: Carservice,
    },
    Towcarservice: {
      screen: Towcarservice,
    },
    Detailspage:{
      screen:Detailspage,
    },
    TowDetail:{
      screen:TowDetail,
    },
    SlideDetail:{
      screen:SlideDetail,
    },
    SignUppage:{
      screen:SignUppage,
    },
    Imagezoom:{
      screen:Imagezoom,
    },
    SignInpage:{
      screen:SignInpage,
    }
  },
  {
    
    initialRouteName: 'Home',
    
     /*The header config from HomeScreen is now here */
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'white',
  
        
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
  
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}