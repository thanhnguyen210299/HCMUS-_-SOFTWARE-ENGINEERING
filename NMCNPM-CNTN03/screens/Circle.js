import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView
} from "react-native";
import messages from "../messages.json";
import MessageCard from "../components/MessageCard.js";
import { Ionicons } from '@expo/vector-icons';

export default class CircleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msgs: messages,
      myMsg: ""
    };
  }

  onSend = async () => {
    var list = this.state.msgs;
    var today = new Date();
    var h = today.getHours() > 9 ? today.getHours() : "0" + today.getHours();
    var m = today.getMinutes() > 9 ? today.getMinutes() : "0" + today.getMinutes();
    var b = h > 11 ? "PM" : "AM"
    h = h > 12 ? h - 12: h
    var time = h + ":" + m + " " + b
    
    var newMsg =     {
      "id": (list.length + 1).toString(),
      "first_name": "Me",
      "last_name": "Me",
      "email": "mlescopq@census.gov",
      "gender": "Female",
      "ip_address": "161.197.37.248",
      "avatar_url": "https://robohash.org/estsuntquis.png?size=50x50&set=set1",
      "last_message_content": this.state.myMsg,
      "last_message_date": time
    }
    await list.push(newMsg)
    this.setState({msgs: list})
    this.setState({myMsg: ""})
    // console.log(list[list.length - 1])
    // console.log(this.state.msgs[this.state.msgs.length - 1])
  }

  render() {
    return (
      <View style={styles.container}>
          <FlatList style={styles.scroll}
            data={this.state.msgs}
            renderItem={({ item }) => (
              <MessageCard
              id={item.id}
              name={item.first_name}
              uri={item.avatar_url}
              last_message_date={item.last_message_date}
              last_message_content={item.last_message_content}
              />
            )}
            keyExtractor={item => item.id.toString()}
            ref = "flatlist"
            onContentSizeChange={() => this.refs.flatlist.scrollToEnd()}
          />
          <KeyboardAvoidingView enabled behavior = "padding" style = {styles.keyboard} keyboardVerticalOffset={50}>
            <TextInput style={styles.input} onChangeText={text => this.setState({myMsg: text})} value={this.state.myMsg} ></TextInput>
            <TouchableOpacity style={styles.buttonSend} onPress={() => this.onSend()}>
              <Ionicons style={styles.icon} name="md-send" size = {32} color="blue"/>
            </TouchableOpacity>
          </KeyboardAvoidingView>
      </View>
    );
  }
}

// CircleScreen.navigationOptions = props => {
//   return {
//     title: "Messages",
//     headerLeft: () => {
//       return (
//         <TouchableOpacity onPress={props.navigation.openDrawer}>
//           <Image
//             style={{ height: 20, width: 20, marginLeft: 10 }}
//             source={{
//               uri:
//                 "https://cdn3.iconfinder.com/data/icons/ui-ux-essentials-solid/24/hamburger-menu-solid-512.png"
//             }}
//           />
//         </TouchableOpacity>
//       );
//     }
//   };
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column"
  },
  scroll: {
    flex: 1
  },
  inputContainer: {
    flex: 10
  },
  contentContainer: {
    flex: 3,
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  messageCardStyle: {
    margin: 5,
    padding: 5,
    width: "100%",
    shadowRadius: 5,
    shadowOpacity: 0.9,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "space-around",
    shadowColor: "rgba(0,0,0,0.2)",
    shadowOffset: { height: 5, width: 5 }
  },
  image: {
    width: 75,
    height: 75,
    borderWidth: 1,
    borderRadius: 37,
    borderColor: "grey"
  },
  cardTextContainer: {
    flex: 1,
    marginLeft: 10
  },
  cardText: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  input: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "90%",
    color: "black",
    borderColor: "#0000ff",
    borderWidth: 1,
    borderRadius: 50,
    margin: "5%",
    padding: "5%"
  },
  keyboard: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonSend: {
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    marginVertical: 5,
    marginHorizontal: 20
  }
});
