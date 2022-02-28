import React from 'react'
import Footer from 'components/Footer'
import NavBar from 'components/NavBar'
import DonateComponent from 'components/donate/DonateComponent'

export default function Donate() {
  return (
    <>
      <NavBar />
      <DonateComponent />
      <Footer />
    </>
  )
}