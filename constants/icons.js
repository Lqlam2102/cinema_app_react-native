/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const IconHome = color => (
  <AntDesign name="home" size={24} color={color} style={{marginBottom: -10}} />
);
const IconDownload = color => (
  <AntDesign
    name="download"
    size={24}
    color={color}
    style={{marginBottom: -10}}
  />
);
const IconVideo = color => (
  <MaterialIcons
    name="video-library"
    size={24}
    color={color}
    style={{marginBottom: -10}}
  />
);
export {IconHome, IconDownload, IconVideo}