import { useLocation, useOutletContext } from "react-router-dom";
interface ICoinConText {
    coinId: string;
}
function Chart() {
    const { coinId } = useOutletContext() as ICoinConText;
    console.log(coinId);
    return <h1>Chart</h1>;
}

export default Chart;
