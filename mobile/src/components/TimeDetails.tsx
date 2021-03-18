import React from 'react';
import { Text, View } from 'react-native';

import Styles from '../styles/components/timeDetails';

interface TimeTypes {
  content: {
    id: number,
    day: string;
    userId: string;
    timeInExpedient: string;
    timeOutExpedient: string | null;
    timeInLunch: string | null;
    timeOutLunch: string | null;
  }
}

const TimeDetails: React.FC<TimeTypes> = ({content}) => {
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  function getTime(time: string): {day: string, month: number} {
    return {
      day: time.split('T')[0].split('-')[2],
      month: Number(time.split('T')[0].split('-')[1])
    }
  }

  function itsToday(day: string): boolean {
    return Date().toLocaleString().split(' ')[2] === day?
    true:
    false; 
  }

  return (
    <View style={Styles.timeDetails}>
      <View style={Styles.date}>
        <Text style={Styles.dateDay}>
          {
            itsToday(getTime(content.day).day)?
            'Hoje':
            getTime(content.day).day
          }
        </Text>
        <Text style={Styles.dateMonth}>{ months[getTime(content.day).month -1] }</Text>
      </View>
      <View>
        <Text style={Styles.textBlue}>Expediente</Text>
        <Text style={Styles.text}>Entrou</Text>
        <Text style={Styles.textValue}>
          {
            content.timeInExpedient?
            content.timeInExpedient:
            '--/--'
          }
        </Text>
        <Text style={Styles.text}>Saiu</Text>
        <Text style={Styles.textValue}>
          {
            content.timeOutExpedient?
            content.timeOutExpedient:
            '--/--'
          }
        </Text>
      </View>
      <View>
        <Text style={Styles.textBlue}>Almoço</Text>
        <Text style={Styles.text}>Entrou</Text>
        <Text style={Styles.textValue}>
          {
            content.timeInLunch?
            content.timeInLunch:
            '--/--'
          }
        </Text>
        <Text style={Styles.text}>Saiu</Text>
        <Text style={Styles.textValue}>
          {
            content.timeOutLunch?
            content.timeOutLunch:
            '--/--'
          }
        </Text>
      </View>
    </View>
  );
};

export default TimeDetails;