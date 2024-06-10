import { LineChart } from "react-native-chart-kit";
import { Dimensions, Text, View } from "react-native";

export default function SpeedGraph({ velocities }) {
  const data = {
    datasets: [
      {
        data: velocities.map((velocity) => velocity.velocity),
      },
    ],
  };

  const chartConfig = {
    backgroundColor: "#fff",
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 0, 256, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForDots: {
      r: "2",
      strokeWidth: "1",
    },
  };

  return (
    <View style={{ backgroundColor: "#fff" }}>
      <Text style={{ fontWeight: "bold", fontSize: 20, padding: 15 }}>
        Speed graph
      </Text>
      <LineChart
        data={data}
        width={Dimensions.get("window").width - 20}
        height={220}
        chartConfig={chartConfig}
        style={{
          paddingHorizontal: 10,
        }}
        withInnerLines={false}
        bezier={true}
        withDots={false}
      />
    </View>
  );
}
