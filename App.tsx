import { NavigationContainer, RouteProp, StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type StackParamList = {
	Home: undefined;
	Details: { itemID: number; otherParam?: string };
	Modal: undefined;
	Dont: undefined;
};

const Stack = createStackNavigator<StackParamList>();

type HomeScreenNavigationProp = StackNavigationProp<StackParamList, "Home">;

export function HomeScreen() {
	const navigation = useNavigation<HomeScreenNavigationProp>();
	return (
		<View style={styles.homeContainer}>
			<Text>Home Screen</Text>
			<Button
				title="Go to Details"
				onPress={() => {
					navigation.navigate("Details", { itemID: 123, otherParam: "Test" });
				}}
			/>
			<Button
				title="Go to Modal"
				onPress={() => {
					navigation.navigate("Modal");
				}}
			/>
			<Button
				title="DO NOT CLICK"
				onPress={() => {
					navigation.navigate("Dont");
				}}
			/>
		</View>
	);
}

type DetailsScreenNavigationProp = StackNavigationProp<
	StackParamList,
	"Details"
>;
type DetailsScreenRouteProp = RouteProp<StackParamList, "Details">;

export function DetailsScreen() {
	const navigation = useNavigation<DetailsScreenNavigationProp>();
	const { params } = useRoute<DetailsScreenRouteProp>();
	return (
		<View style={styles.container}>
			<Text>Details Screen</Text>
      <Text>itemId: {params.itemID} </Text>
      <Text>otherParam: {params.otherParam} </Text>
			<Button
				title="Go to Home"
				onPress={() => {
					navigation.goBack();
				}}
			/>
		</View>
	);
}

type ModalScreenNavigationProp = StackNavigationProp<StackParamList, "Modal">;

export function ModalScreen() {
	const navigation = useNavigation<ModalScreenNavigationProp>();

	const closeAndNavigate = () => {
		const unsubscribe = navigation.addListener("transitionEnd", () => {
			navigation.navigate("Details", { itemID: 76 });
			unsubscribe();
		});
		navigation.dispatch(StackActions.pop(1));
	};
	return (
		<View style={styles.container}>
			<Button title="Go to Details" onPress={closeAndNavigate} />
			<Button
				title="Go to modal"
				onPress={() => {
					navigation.push("Modal");
				}}
			/>
		</View>
	);
}

type CrabScreenNavigationProp = StackNavigationProp<StackParamList, "Dont">;
export function DontScreen() {
	const navigation = useNavigation<CrabScreenNavigationProp>();
	return (
		<SafeAreaView style={styles.container}>
			<Image
				source={{
					uri: "https://images.emojiterra.com/twitter/v13.1/512px/1f928.png",
				}}
				alt={"Raised Eyebrow"}
				style={styles.dont}
			/>
			<Text>Why did you click the button?</Text>
			<Button
				title="Sorry, Ill go back"
				onPress={() => {
					navigation.goBack();
				}}
			/>
		</SafeAreaView>
	);
}

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={HomeScreen}

				/>
				<Stack.Screen
					name="Details"
					component={DetailsScreen}
					options={{ headerBackTitle: "go back" }}
				/>
				<Stack.Screen
					name="Modal"
					component={ModalScreen}
					options={{ presentation: "modal" }}
				/>
				<Stack.Screen
					name="Dont"
					component={DontScreen}
					options={{
						headerTitle: "What did I say?",
						headerStyle: {
							backgroundColor: "gold",
						},
						headerTitleStyle: {
							color: "black",
						},
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	homeContainer: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "space-evenly",
	},
	dont: {
		height: 250,
		width: 250,
	},
	buttons: {
		marginVertical: 5,
	},
});