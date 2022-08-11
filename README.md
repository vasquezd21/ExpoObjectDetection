# Object Detection Implementation for Android Mobile using ONNX Runtime

Steps of building this project from scratch

0. Prepare environment and install required components
  1. install Node.js
  2. install expo
  ```
  npm install -g expo-cli
  ```
  3. install yarn
  ```
  npm install -g yarn
  ```
  4. install onnxruntime-react-native
  ```
  expo install onnxruntime-react-native@dev
  ```
  2. The object detection tf lite model used in this project can be found and downloaded here https://github.com/microsoft/onnxruntime-inference-examples/tree/main/mobile/examples/object_detection/ios
  3. The tf lite model must first be converted to an ONNX model then an ORT model that is opset version 13.

    NOTE:


    - ORT is not compatable with the most recent version of python as of 8/11/2022, so the python environment must first be downgraded to version 3.9 to convert ONNX to ORT


    1. Export the tf lite model to ONNX by running the following command.
      ```
      python -m tf2onnx.convert --tflite .\ssd_mobilenet_v1_1_metadata_1.tflite --opset 13 --output ./ssd_mobilenet_v1.opset13.exported.onnx
      ```
    2. Convert ONNX model to ORT by running the following command.
      ```
      python -m onnxruntime.tools.convert_onnx_models_to_ort ./ssd_mobilenet_v1.opset13.exported.onnx
      ```
  4. The model used is of uint8 data type, which is currently not supported. Changes to the TensorHelper.java file must be made to add support
    - in your expo project, go to folder   ``` node_modules\onnxruntime-react-native\android\src\main\java\ai\onnxruntime\reactnative ```and file the file TensorHelper.java
    
