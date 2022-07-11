import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

import * as ort from 'onnxruntime-react-native';
import { Asset } from 'expo-asset';

// import * as ortRn from "onnxruntime-react-native";
import * as ortWeb from "onnxruntime-web";
import { Platform } from 'react-native';


export const getOrtInstance = () => {
  console.log("Function was called successfully");
    if (Platform.OS == "web") {
        return ortWeb;
    } else {
        return ort;
    }
};



let myModel: ort.InferenceSession;

async function loadModel() {
  try {
    const assets = await Asset.loadAsync(require('./assets/ssd_mobilenet_v1_10.ort'));
    console.log(assets);
    const modelUri = assets[0].localUri;
    console.log(modelUri);
    if (!modelUri) {
      Alert.alert('failed to get model URI', `${assets[0]}`);
      console.log("failed to get model uri");
    } else {
      myModel = await ort.InferenceSession.create(modelUri);
      Alert.alert(
        'model loaded successfully',
        `input names: ${myModel.inputNames}, output names: ${myModel.outputNames}`);
        console.log("model loaded successfully");
    }
  } catch (e) {
    Alert.alert('failed to load model test', `${e}`);
    console.log("failed to load model test");
    throw e;
  }
}

async function runModel() {
  try {
    console.log("TEST");
    const inputData = new Uint8Array(300 * 300 * 3)
    // console.log(inputData.length);
    const feeds:Record<string, ort.Tensor> = {};
    feeds[myModel.inputNames[0]] = new ort.Tensor("uint8", inputData, [1,300,300,3]);
    console.log(feeds);
    const fetches = await myModel.run(feeds);
    console.log(fetches);
    const output = fetches[myModel.outputNames[0]];
    if (!output) {
      Alert.alert('failed to get output', `${myModel.outputNames[0]}`);
      console.log("FAILED TO GET OUTPUT");
    } else {
      Alert.alert(
        'model inference successfully',
        `output shape: ${output.dims}, output data: ${output.data}`);
        console.log("MODEL INFERENCE SUCCESSFULLY")
    }
  } catch (e) {
    Alert.alert('failed to inference model', `${e}`);
    console.log("FAILED TO INFERENCE MODEL")
    throw e;
  }
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>using ONNX Runtime for React Native</Text>
      <Button title='Load model' onPress={loadModel}></Button>
      <Button title='Run' onPress={runModel}></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});