import { Platform, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity,Keyboard,ScrollView } from 'react-native';
import Task from './components/Task';
import React,{useState} from 'react'

export default function App() {
  const [task,setTask] = useState();
  const [taskItems,setTaskItems] = useState([]);

  const handleTasks= () =>{
    Keyboard.dismiss();
    setTaskItems([...taskItems,task])
    setTask(null)
  }

  const completeTasks = (index)=>{
    let itemCopy = [...taskItems]
    itemCopy.splice(index, 1)
    setTaskItems(itemCopy)
  }

  return (
    <View style={styles.container}>
      <ScrollView
      contentContainerStyle={{
        flexGrow: 1
      }}
      keyboardShouldPersistTaps='handled'
      >
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>
          Today's tasks
        </Text>
        <View style={styles.items}>
          {
            taskItems.map((item,index)=>{
              return <TouchableOpacity onPress={()=>{completeTasks(index)}} key={index}>
                     <Task text={item}/>
                     </TouchableOpacity>
            }

            )
          }
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={!Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={"write a task"} onChangeText={text=>{setTask(text)}} value={task}/>
        <TouchableOpacity onPress={()=>{handleTasks()}}>
        <View style={styles.addWrapper}>
          <Text style={styles.addText}>+</Text>
        </View>
      </TouchableOpacity>
      </KeyboardAvoidingView>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30
  },
  writeTaskWrapper: {
    position:'absolute',
    bottom:60,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-around',

  },
  input: {
    paddingVertical:15,
    width:250,
    paddingHorizontal:15,
    backgroundColor:'white',
    borderRadius:60,
    borderWidth:1,
    borderColor:'#C0C0C0'

  },
  addWrapper: {
    width:60,
    height:60,
    backgroundColor:'white',
    borderRadius:60,
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1,
    borderColor:'#C0C0C0'

  },
  addText: {

  },
});
