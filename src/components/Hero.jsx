import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero bg-white py-12">
      <div className="wrap hero-grid max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="hero-copy space-y-4">
          <p className="eyebrow text-sm uppercase text-gray-600">Senior Product Engineer · Mobile &amp; Backend</p>
          <h1 className="text-4xl font-bold text-gray-900">
            I build products that stay reliable when reality gets messy.
          </h1>
          <p className="lede text-lg text-gray-700">
            I help ambitious teams turn complex requirements into dependable products—from the first system decision through launch and production.
          </p>
          <div className="hero-actions flex space-x-4 mt-4">
            <a className="btn btn-primary" href="mailto:mashrafiahnam1@gmail.com">
              Discuss your product
            </a>
            <Link className="btn btn-ghost" to="/products">
              Explore selected work
            </Link>
          </div>
        </div>
        <figure className="hero-photo">
          <img src="/portrait.jpg" alt="Mashrafi Ahnam Shafin" className="rounded-lg shadow-lg" />
        </figure>
      </div>
    </section>
  );
}
