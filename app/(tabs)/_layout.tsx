import { Tabs } from "expo-router";
import { ImageBackground, Image, Text, View } from "react-native";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

function TabIcon({ focused, icon, title }: { focused: boolean; icon: any; title: string }) {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          minWidth: 112,
          minHeight: 48,
          paddingHorizontal: 12,
          borderRadius: 25,
        }}
      >
        <Image source={icon} style={{ width: 20, height: 20, tintColor: "#151312" }} />
        <Text style={{ color: "#151312", fontSize: 16, fontWeight: "600", marginLeft: 6 }}>
          {title}
        </Text>
      </ImageBackground>
    );
  }

  return (
    <View style={{ justifyContent: "center", alignItems: "center", width: 50, height: 50 }}>
      <Image source={icon} style={{ width: 22, height: 22, tintColor: "#A8B5DB" }} />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0F0D23",
          borderRadius: 50,
          marginHorizontal: 20,
          height: 60,
          position: "absolute",
          marginBottom:10,
          left: 0,
          right: 0,
          borderWidth: 1,
          borderColor: "#0F0D23",
          zIndex: 1000, // Ensure it stays on top
          elevation: 10, // For Android shadow
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.home} title="Home" />,
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.search} title="Search" />,
        }}
      />

      <Tabs.Screen
        name="save"
        options={{
          title: "Save",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.save} title="Save" />,
        }}
      />

      {/* <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.person} title="Profile" />,
        }}
      /> */}
      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.login} title="Login" />,
        }}
      />
      <Tabs.Screen
        name="signup"
        options={{
          title: "Signup",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.add_user} title="Signup" />,
        }}
      />
    </Tabs>
  );
}
