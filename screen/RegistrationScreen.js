import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';

import Axios from 'axios';

const RegistrationScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const authenticate = async () => {
      Axios.post(
        'http://www.cstech.poornima.org/react/authentication.php',
        JSON.stringify({
          username,
          email,
          password,
        })
          .then((res) => {
            console.log(res.data);
            setIsSubmitted(false);
            // Navigate user based on the response
          })
          .catch((err) => {
            console.log(err);
          })
      );
    };
    if (isSubmitted) authenticate();
  }, [isSubmitted]);

  const usernameHandler = (usernameInput) => {
    // put validations here
    setUsername(usernameInput);
  };

  return (
    <View style={styles.container}>
      <Text>Registration</Text>
      <TextInput
        placeholder="username"
        style={styles.input}
        onChangeText={usernameHandler}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        autoCapitalize="none"
        onChangeText={(emailInput) => setEmail(emailInput)}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        autoCapitalize={'none'}
        secureTextEntry={true}
        onChangeText={(passwordInput) => setPassword(passwordInput)}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Register for FREE!"
          onPress={() => setIsSubmitted(true)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
    width: '55%',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default RegistrationScreen;
