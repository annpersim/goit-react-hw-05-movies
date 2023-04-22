import styled from '@emotion/styled';

export const Heading = styled.h1`
  text-align: center;
`;

export const MovieList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

export const MovieItem = styled.li`
  flex-basis: calc((100% - 75px) / 5);
`;

export const MovieImage = styled.img`
  width: 100%;
  display: block;
`;
