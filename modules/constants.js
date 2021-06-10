import React from 'react'
import { Dimensions } from 'react-native'

const win = Dimensions.get('window');
const h = win.height;
const w = win.width;

export { h, w }