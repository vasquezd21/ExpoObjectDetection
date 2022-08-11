# Object Detection Implementation for Android Mobile using ONNX Runtime

Steps of building this project from scratch

0. Prepare environment and install required components
  i. https://github.com/fs-eire/ort-rn-hello-world Follow steps here to set up ONNX Runtime project with Expo
  ii. The object detection tf lite model used in this project can be found and downloaded here https://github.com/microsoft/onnxruntime-inference-examples/tree/main/mobile/examples/object_detection/ios
  iii. The tf lite model must first be converted to an ONNX model then an ORT model.
    - Steps to convert the tf lite model to ONNX can be found here https://onnxruntime.ai/docs/tutorials/tf-get-started.html#:~:text=Link%20Getting%20Started%20Converting%20TensorFlow%20to%20ONNX%201,and%20Troubleshooting%20guide.%20...%205%20Link%20Next%20Steps
    - Once the model is in ONNX format, it must be converted to ORT format following these steps https://onnxruntime.ai/docs/reference/ort-format-models.html
    NOTE:
    - ORT is not compatable with the most recent version of python as of 8/11/2022, so the python environment must first be downgraded to version 3.9 to convert ONNX to ORT

1. 
