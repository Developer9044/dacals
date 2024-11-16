import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import Slider from '@react-native-community/slider';

const FDCalculatorGraphCom = () => {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(5);
  const [time, setTime] = useState(1);
  const [maturityValue, setMaturityValue] = useState(null);
  const [totalReturns, setTotalReturns] = useState(null);
  const [pieData, setPieData] = useState([]);

  const calculateFD = () => {
    const P = parseFloat(principal);
    const R = parseFloat(rate) / 100;
    const T = parseFloat(time);
    const A = P * Math.pow(1 + R / 4, 4 * T);
    setMaturityValue(A.toFixed(2));
    setTotalReturns((A - P).toFixed(2));

    const maturityValue = P * Math.pow(1 + R / 4, 4 * T);
    const interestEarned = maturityValue - P;

    const pieData = [
      {
        name: 'Principal',
        amount: P,
        color: 'rgba(131, 167, 234, 1)',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Interest Earned',
        amount: interestEarned,
        color: '#F00',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
    ];
    setPieData(pieData);
  };

  useEffect(() => {
    calculateFD();
  }, [principal, rate, time]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Total Investment</Text>
      <Slider
        style={styles.slider}
        minimumValue={1000}
        maximumValue={10000000}
        step={1000}
        value={principal}
        onValueChange={setPrincipal}
        minimumTrackTintColor="#1EB1FC"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#1EB1FC"
      />
      <TextInput
        style={styles.valueText}
        value={principal.toString()}
        onChangeText={value => setPrincipal(Number(value))}
        keyboardType="numeric"
      />

      <Text>Rate Of Interest (p.a)</Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={20}
        step={0.5}
        value={rate}
        onValueChange={setRate}
        minimumTrackTintColor="#1EB1FC"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#1EB1FC"
      />
      <TextInput
        style={styles.valueText}
        value={rate.toString()}
        onChangeText={value => setRate(Number(value))}
        keyboardType="numeric"
      />

      <Text>Time Period (years)</Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={20}
        step={1}
        value={time}
        onValueChange={setTime}
        minimumTrackTintColor="#1EB1FC"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#1EB1FC"
      />
      <TextInput
        style={styles.valueText}
        value={time.toString()}
        onChangeText={value => setTime(Number(value))}
        keyboardType="numeric"
      />

      {maturityValue && (
        <>
          <Text style={styles.result}>
            Invested Amount: ₹ {principal.toLocaleString()}
          </Text>
          <Text style={styles.result}>Total Returns: ₹ {totalReturns}</Text>
          <Text style={styles.result}>Total Value: ₹ {maturityValue}</Text>

          <Text>FD Distribution</Text>
          <PieChart
            data={pieData}
            width={Dimensions.get('window').width - 16}
            height={220}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </>
      )}
    </ScrollView>
  );
};

export default FDCalculatorGraphCom;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  slider: {
    width: 300,
    height: 40,
  },
  valueText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    paddingLeft: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height: 40,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
