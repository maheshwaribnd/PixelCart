import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const NewPassword = () => {
  return (
    <View style={styles.container}>
      <CustomHeader name="Reset Password" />
      <View style={{padding: WIDTH(4)}}>
        <View style={{justifyContent: 'center'}}>
          <Text style={styles.subTitle}>New Password</Text>
          <View>
            <TextInput
              style={styles.InputField}
              placeholder="Enter new password"
              placeholderTextColor={COLOR.Gray}
              value={userName}
              onChangeText={inputOnChange}
              onBlur={validationFunction}
            />
          </View>

          <Text style={styles.subTitle}>Confirm Password</Text>
          <View>
            <TextInput
              style={styles.InputField}
              placeholder="re-enter password"
              placeholderTextColor={COLOR.Gray}
              value={userName}
              onChangeText={inputOnChange}
              onBlur={validationFunction}
            />
          </View>
        </View>

        <View>
          <CustomBtn1
            name="Reset Password"
            onPress={() => ForgotPasswordFunction()}
          />
        </View>
      </View>
    </View>
  );
};

export default NewPassword;

const styles = StyleSheet.create({});
