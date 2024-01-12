import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HOST } from "../constants/Host";
import "../styles/ObjectList.css";

export interface IObjectData {
  score: number;
  show: Show;
}

export interface Show {
  id: number;
  url: string;
  name: string;
  type: string;
  language: Language;
  genres: string[];
  status: Status;
  runtime: number | null;
  averageRuntime: number | null;
  premiered: null | string;
  ended: null | string;
  officialSite: null | string;
  schedule: Schedule;
  rating: Rating;
  weight: number;
  network: Network | null;
  webChannel: Network | null;
  dvdCountry: null;
  externals: Externals;
  image: Image | null;
  summary: string;
  updated: number;
  _links: Links;
}

export interface Links {
  self: Previousepisode;
  previousepisode?: Previousepisode;
}

export interface Previousepisode {
  href: string;
}

export interface Externals {
  tvrage: null;
  thetvdb: number | null;
  imdb: null | string;
}

export interface Image {
  medium: string;
  original: string;
}

export enum Language {
  English = "English",
  Japanese = "Japanese",
  Korean = "Korean",
}

export interface Network {
  id: number;
  name: string;
  country: Country | null;
  officialSite: null | string;
}

export interface Country {
  name: string;
  code: string;
  timezone: string;
}

export interface Rating {
  average: number | null;
}

export interface Schedule {
  time: string;
  days: string[];
}

export enum Status {
  Ended = "Ended",
  InDevelopment = "In Development",
  Running = "Running",
}

const ObjectList = () => {
  const [objectData, setObjectData] = useState<IObjectData[]>([]);

  useEffect(() => {
    fetch(`${HOST}search/shows?q=all`)
      .then((response) => response.json())
      .then((data) => setObjectData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="object-list">
      {objectData.map((object, index) => (
        <div key={index} className="object-item">
          <Link to={`/show/:${object.show.id}`}>
            {object.show.image?.medium ? (
              <img src={object.show.image?.medium} alt={object.show.name} />
            ) : (
              <h3>Image Unavailable</h3>
            )}
            <div className="object-details">
              <h3>{object.show.name}</h3>

              <p>{object.show.language}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ObjectList;
