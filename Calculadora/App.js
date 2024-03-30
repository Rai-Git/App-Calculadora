import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {

  const buttons = [
    'AC', 'DEL', '%', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '+/-', '='
  ];

  const [currentNumber, setCurrentNumber] = useState("")
  const [lastNumber, setLastNumber] = useState("") 

  function handleInput(buttonPressed){
    if(buttonPressed === "*" | buttonPressed === "/" | buttonPressed === "+" | buttonPressed === "-"){
      setCurrentNumber(currentNumber + " " + buttonPressed + " ")
      return
    }
    if(buttonPressed === "DEL"){
      setCurrentNumber(currentNumber.substring(0,(currentNumber.length - 1)))
      return
    }
    if(buttonPressed === "."){
      setCurrentNumber(currentNumber + buttonPressed)
      return
    }
    if(buttonPressed === "+/-"){
      return
    }
    if(buttonPressed === "AC"){
      setLastNumber("")
      setCurrentNumber("")
      return
    }
    if(buttonPressed === "="){
      setLastNumber(currentNumber + " = ")
      calculator()
      return
    }
    setCurrentNumber(currentNumber + buttonPressed)
  }

  function calculator(){
    const splitNumbers = currentNumber.split(" ")
    const operator = splitNumbers[1]
    console.log(splitNumbers)
    if(operator === "*"){
      setCurrentNumber((parseFloat(splitNumbers[0]) * parseFloat(splitNumbers[2])).toString())
    }
    if(operator === "/"){
      setCurrentNumber((parseFloat(splitNumbers[0]) / parseFloat(splitNumbers[2])).toString())
    }
    if(operator === "+"){
      setCurrentNumber((parseFloat(splitNumbers[0]) + parseFloat(splitNumbers[2])).toString())
    }
    if(operator === "-"){
      setCurrentNumber((parseFloat(splitNumbers[0]) - parseFloat(splitNumbers[2])).toString())
    }
  }

  return (
    <View>
      <View style={styles.result}>
        <Text style={styles.historyText}>{lastNumber}</Text>      
        <Text style={styles.resultText}>{currentNumber}</Text>      
      </View>

      <View style={styles.buttons}>
  {buttons.map((button) => (
    <TouchableOpacity
      key={button}
      style={[
        styles.button,
        button === '0' ? { width: (92 * 2) + 5, alignItems: 'flex-start', paddingLeft: 20 } : {},
        // Se o botão for '=', ajusta a largura para ocupar 4 espaços
        button === '=' ? { width: (90 * 4) + (10 * 3), justifyContent: 'center', alignItems: 'center' } : {}
      ]}
      onPress={() => handleInput(button)}
    >
      <Text style={styles.textButton}>{button}</Text>
    </TouchableOpacity>
  ))}
</View>


    </View>
  );
}
const styles = StyleSheet.create({
  result:{
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
    height: 300,
    backgroundColor: '#f5f5f5'
  },
   buttons:{
    flexDirection: 'row',
    flexWrap: 'wrap',
   },

   button:{
    backgroundColor: '#4CAF50', // Cor de fundo do botão
    padding: 10, // Espaçamento interno do botão
    borderRadius: 5, // Arredondamento das bordas
    justifyContent: 'center', // Centraliza o conteúdo no eixo Y (vertical)
    alignItems: 'center', // Centraliza o conteúdo no eixo X (horizontal)
    margin: 5, // Margem externa para separar os botões
    width: 90, // Largura do botão
    height: 75, // Altura do botão
   
   },

   textButton: {
    color: '#FFFFFF', // Cor do texto
    fontSize: 20, // Tamanho da fonte
   },

   resultText:{
      fontWeight: '100',
      fontSize: 80,
      margin: 10,
      alignSelf: 'flex-end',
   },

   historyText:{
      fontSize: 22,
      marginBottom: 0,
      marginRight: 10,
      alignSelf: 'flex-end',
   },

});
