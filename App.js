/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import firebase from 'firebase';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  frame: {
    width: 150,
    height: 150,
    backgroundColor: '#eee',
  },
  image: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  sample: {
    height: 150,
  },
});

export default class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: "AIzaSyCFwM_gmaarn1wzJ4BwpGBKCZjHbE2vtwA",
      authDomain: "compresseduploader.firebaseapp.com",
      databaseURL: "https://compresseduploader.firebaseio.com",
      projectId: "compresseduploader",
      storageBucket: "compresseduploader.appspot.com",
      messagingSenderId: "604873825048"
    };

    firebase.initializeApp(config);
  }

  /**
   *
   * Image Picker makes user available to upload images
   */
  state = {
    ImageSource: null,
    errorUpload: false,
  };

  pickImage() {
    const options = {
      title: 'Select a Image',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    // Image Picker で 画像を表示する
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        console.log('source', source);
        // Image Resizer で 画像をリサイズする
        ImageResizer.createResizedImage(source.uri, 20, 60, 'PNG', 10)
        .then(({uri}) => {
          let resizeSource = { uri: uri };
          this.setState({
            ImageSource: resizeSource,
          });
        }).catch((err) => {
          console.log(err);
          return Alert.alert('Unable to resize the photo',
            'Check the console for full the error message');
        });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Image</Text>
        <TouchableOpacity
          style={styles.frame}
          onPress={this.pickImage.bind(this)}
        >
          {
            this.state.ImageSource === null ?
            <View style={styles.image}>
            </View> :
            <View>
              <Image style={styles.sample} source={this.state.ImageSource} />
            </View>
          }
        </TouchableOpacity>
      </View>
    );
  }
}
