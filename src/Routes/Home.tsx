import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import styled from "styled-components";
import { getMovies, IMoviesInfo } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
	background-color: black;
`;
const Loader = styled.div`
	height: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Banner = styled.div<{ bgPhoto: string }>`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 50px;
	background-image: linear-gradient(
			rgba(15, 10, 10, 0.5),
			rgba(0, 0, 0, 0.5) 90%,
			rgba(0, 0, 0, 1)
		),
		url(${(props) => props.bgPhoto});
	background-size: cover;
`;
const Title = styled.h2`
	font-size: 2.6em;
	margin-bottom: 15px;
`;
const Overview = styled.p`
	font-size: 1em;
	width: 50%;
`;

function Home() {
	const { isLoading, data } = useQuery<IMoviesInfo>(
		["movies", "nowPlaying"],
		getMovies
	);
	useEffect(() => {
		return console.log(isLoading, data?.results[0].backdrop_path);
	}, [isLoading, data?.results]);

	return (
		<Wrapper>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<>
					<Banner
						bgPhoto={makeImagePath(
							data?.results[0].backdrop_path ?? ""
						)}
					>
						<Title>{data?.results[0].title}</Title>
						<Overview>{data?.results[0].overview}</Overview>
					</Banner>
				</>
			)}
		</Wrapper>
	);
}

export default Home;
