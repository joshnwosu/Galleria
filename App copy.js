// import { StatusBar } from "expo-status-bar";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { db } from "./Core/Config";
import MasonryList from "@react-native-seoul/masonry-list";
import AutoHeightImage from "react-native-auto-height-image";
import Constants from "expo-constants";
import { BlurView } from "expo-blur";

export default function App() {
  const [userDoc, setUserDoc] = useState(null);
  const [text, setText] = useState("");

  const [filteredItems, setFilteredItem] = useState([
    {
      name: "Joshua Nwosu",
      bio: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1655365225178-b1b4c59cbdb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzg0NDJ8MHwxfGFsbHw5fHx8fHx8Mnx8MTY1NTM4MDU2NQ&ixlib=rb-1.2.1&q=80&w=400",
    },
    {
      name: "Jerry Nwosu",
      bio: "Computer Scientist",
      image:
        "https://images.unsplash.com/photo-1655219282218-6a4a8d91a699?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzg0NDJ8MHwxfGFsbHw4fHx8fHx8Mnx8MTY1NTM4MDU2NQ&ixlib=rb-1.2.1&q=80&w=400",
    },
    {
      name: "Great Nwosu",
      bio: "Game Developer",
      image:
        "https://images.unsplash.com/photo-1655339998027-fed1e01b783a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzg0NDJ8MHwxfGFsbHw3fHx8fHx8Mnx8MTY1NTM4MDU2NQ&ixlib=rb-1.2.1&q=80&w=1080",
    },
    {
      name: "Joshua Nwosu",
      bio: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1648737966670-a6a53917ed19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzg0NDJ8MXwxfGFsbHwxfHx8fHx8Mnx8MTY1NTM4MDU2NQ&ixlib=rb-1.2.1&q=80&w=400",
    },
    {
      name: "Jerry Nwosu",
      bio: "Computer Scientist",
      image:
        "https://images.unsplash.com/photo-1653656120539-dba95a8e0d01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzg0NDJ8MHwxfGFsbHwyfHx8fHx8Mnx8MTY1NTM4MDU2NQ&ixlib=rb-1.2.1&q=80&w=400",
    },
    {
      name: "Great Nwosu",
      bio: "Game Developer",
      image:
        "https://images.unsplash.com/photo-1655321591297-2e332ad3859f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzg0NDJ8MHwxfGFsbHwzfHx8fHx8Mnx8MTY1NTM4MDU2NQ&ixlib=rb-1.2.1&q=80&w=400",
    },
    {
      name: "Joshua Nwosu",
      bio: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1655326524786-dcfe033393b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzg0NDJ8MHwxfGFsbHw0fHx8fHx8Mnx8MTY1NTM4MDU2NQ&ixlib=rb-1.2.1&q=80&w=400",
    },
    {
      name: "Jerry Nwosu",
      bio: "Computer Scientist",
      image:
        "https://images.unsplash.com/photo-1655338535123-1a552c71cb03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzg0NDJ8MHwxfGFsbHw1fHx8fHx8Mnx8MTY1NTM4MDU2NQ&ixlib=rb-1.2.1&q=80&w=400",
    },
    {
      name: "Great Nwosu",
      bio: "Game Developer",
      image:
        "https://images.unsplash.com/photo-1638913972776-873fc7af3fdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzg0NDJ8MXwxfGFsbHw2fHx8fHx8Mnx8MTY1NTM4MDU2NQ&ixlib=rb-1.2.1&q=80&w=400",
    },
    {
      name: "Joshua Nwosu",
      bio: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1655365225178-b1b4c59cbdb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzg0NDJ8MHwxfGFsbHw5fHx8fHx8Mnx8MTY1NTM4MDU2NQ&ixlib=rb-1.2.1&q=80&w=400",
    },
    {
      name: "Jerry Nwosu",
      bio: "Computer Scientist",
      image:
        "https://images.unsplash.com/photo-1655219282218-6a4a8d91a699?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzg0NDJ8MHwxfGFsbHw4fHx8fHx8Mnx8MTY1NTM4MDU2NQ&ixlib=rb-1.2.1&q=80&w=400",
    },
    {
      name: "Great Nwosu",
      bio: "Game Developer",
      image:
        "https://images.unsplash.com/photo-1655339998027-fed1e01b783a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzg0NDJ8MHwxfGFsbHw3fHx8fHx8Mnx8MTY1NTM4MDU2NQ&ixlib=rb-1.2.1&q=80&w=1080",
    },
    {
      name: "Joshua Nwosu",
      bio: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1648737966670-a6a53917ed19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzg0NDJ8MXwxfGFsbHwxfHx8fHx8Mnx8MTY1NTM4MDU2NQ&ixlib=rb-1.2.1&q=80&w=400",
    },
    {
      name: "Jerry Nwosu",
      bio: "Computer Scientist",
      image:
        "https://images.unsplash.com/photo-1653656120539-dba95a8e0d01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzg0NDJ8MHwxfGFsbHwyfHx8fHx8Mnx8MTY1NTM4MDU2NQ&ixlib=rb-1.2.1&q=80&w=400",
    },
    {
      name: "Great Nwosu",
      bio: "Game Developer",
      image:
        "https://images.unsplash.com/photo-1655321591297-2e332ad3859f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzg0NDJ8MHwxfGFsbHwzfHx8fHx8Mnx8MTY1NTM4MDU2NQ&ixlib=rb-1.2.1&q=80&w=400",
    },
    {
      name: "Joshua Nwosu",
      bio: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1655326524786-dcfe033393b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzg0NDJ8MHwxfGFsbHw0fHx8fHx8Mnx8MTY1NTM4MDU2NQ&ixlib=rb-1.2.1&q=80&w=400",
    },
    {
      name: "Jerry Nwosu",
      bio: "Computer Scientist",
      image:
        "https://images.unsplash.com/photo-1655338535123-1a552c71cb03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzg0NDJ8MHwxfGFsbHw1fHx8fHx8Mnx8MTY1NTM4MDU2NQ&ixlib=rb-1.2.1&q=80&w=400",
    },
    {
      name: "Great Nwosu",
      bio: "Game Developer",
      image:
        "https://images.unsplash.com/photo-1638913972776-873fc7af3fdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzg0NDJ8MXwxfGFsbHw2fHx8fHx8Mnx8MTY1NTM4MDU2NQ&ixlib=rb-1.2.1&q=80&w=400",
    },
  ]);
  const randomBool = useMemo(() => Math.random() < 0.5, []);

  // useEffect(() => {
  //   Image.getSize(filteredItems[5].image, (width, height) => {
  //     alert({ width, height });
  //   });
  // }, []);

  const CardItem = ({ item }) => (
    <View
      style={{
        // padding: 20,
        marginHorizontal: 5,
        marginBottom: 10,

        // borderWidth: 1,
        // borderColor: "red",
        // maxHeight: 200,
      }}
    >
      <View
        style={{
          backgroundColor: "#999",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        {/* <Image
          source={{ uri: item.image }}
          resizeMode="cover"
          style={{
            width: "100%",
            height: item.height,
            // backgroundColor: "#999",
            borderRadius: 10,
            alignSelf: "stretch",
          }}
        /> */}
        <AutoHeightImage
          width={200}
          source={{ uri: item.image }}
          resizeMode="cover"
        />
      </View>

      {/* <Text>{item.name}</Text> */}
    </View>
  );

  const Create = () => {
    // alert("My name is Joshua");
    const myDoc = doc(db, "MyCollection", "MyDocument");
    const docData = {
      name: "Joshua",
      bio: "Software Engineer",
    };
    setDoc(myDoc, docData)
      //handle promises
      .then(() => {
        alert("Document created!");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const Read = () => {
    const myDoc = doc(db, "MyCollection", "MyDocument");

    getDoc(myDoc)
      //handle promises
      .then((snapshot) => {
        if (snapshot.exists) {
          setUserDoc(snapshot.data());
        } else {
          alert("No Doc Found!");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const Update = (value, merge) => {
    const myDoc = doc(db, "MyCollection", "MyDocument");

    setDoc(myDoc, value, { merge: merge })
      //handle promises
      .then(() => {
        alert("Updated Successfully!");
        setText("");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const Delete = () => {
    const myDoc = doc(db, "MyCollection", "MyDocument");

    deleteDoc(myDoc)
      //handle promises
      .then(() => {
        alert("Deleted Successfully!");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      {/* <SafeAreaView> */}
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      {/* </SafeAreaView> */}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <MyStatusBar backgroundColor="#000000" barStyle="light-content" /> */}
      {/* <View style={styles.statusBar2} /> */}
      {/* <View style={{ marginTop: Constants.statusBarHeight }} /> */}

      {/* <View style={styles.appBar} /> */}
      {/* <View style={styles.content} /> */}
      {/* <StatusBar style="dark" /> */}
      {/* <Button title="Create New Doc" onPress={Create}></Button>
      <Button title="Read Doc" onPress={Read}></Button>
      {userDoc != null && <Text>Bio: {userDoc.bio}</Text>}
      <TextInput
        placeholder="Type here"
        value={text}
        onChangeText={(text) => setText(text)}
        style={{
          width: "90%",
          fontSize: 18,
          padding: 12,
          borderColor: "gray",
          borderWidth: 0.2,
          borderRadius: 10,
          marginVertical: 20,
        }}
      />
      <Button
        title="Update Doc"
        disabled={text == ""}
        onPress={() => {
          Update({ bio: text }, true);
        }}
      ></Button>
      <Button title="Delete Doc" onPress={Delete}></Button> */}

      <View
        style={{
          marginTop: Constants.statusBarHeight,
          flex: 1,
          height: 50,
          backgroundColor: "red",
        }}
      />
      <MasonryList
        data={filteredItems}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <CardItem item={item} />}
        // refreshing={isLoadingNext}
        // onRefresh={() => refetch({first: ITEM_CNT})}
        onEndReachedThreshold={0.1}
        // onEndReached={() => loadNext(ITEM_CNT)}
        // style={{
        //   padding: 10,
        // }}
        containerStyle={{
          paddingHorizontal: 10,
          paddingTop: Constants.statusBarHeight,
        }}
      />
      {/* </View> */}
      <BlurView intensity={100} tint="light" style={styles.blurContainer} />
    </View>
  );
}

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    // marginTop: 40,
    // marginTop: Constants.statusBarHeight,
    // paddingTop: Constants.statusBarHeight
  },

  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  statusBar2: {
    flex: 1,
    backgroundColor: "#00000099",
    position: "absolute",
    width: "100%",
    height: Constants.statusBarHeight,
    // maginTop: 20,
    zIndex: 9999,
  },
  appBar: {
    backgroundColor: "#79B45D",
    height: APPBAR_HEIGHT,
  },
  content: {
    flex: 1,
    backgroundColor: "#33373B",
    paddingTop: Constants.statusBarHeight,
  },
  blurContainer: {
    width: "100%",
    height: Constants.statusBarHeight,
    position: "absolute",
    zIndex: 999,
  },
});
