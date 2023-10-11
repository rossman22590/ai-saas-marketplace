import { type Listing } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { api } from "~/utils/api";
import Icon from "~/components/Icon";
import MakeOfferModal from "~/components/MakeOfferModal";
import { useState } from "react";
import InvisibleNavbar from "~/components/InvisibleNavbar";

function Card({ listing, setProductDetails }: { listing: Listing, setProductDetails: any }) {
    const openMakeOfferModal = (e: any, productDetails: any) => {
        setProductDetails(productDetails)
        document.getElementById('make-offer-modal')?.classList.add('show')
    }

    return (
        <div className="product-card">
            <div className="card-header">
                <div className="left">
                    <div className="category-wrapper">
                        <Icon icon='saas_icon' />
                    </div>
                    <div className="product-name">
                        <div className="title">
                            {listing.name}
                        </div>
                        <span className="created-at">Listed at 27.04.2023</span>
                    </div>
                </div>
                <div className="right">
                    <div className="wishList">
                        <div className="icon-wrapper">
                            <Icon icon='wishlist' />
                        </div>
                    </div>
                    <div className="icon-wrapper">
                        <Icon icon='notifications_on' />
                    </div>
                </div>
            </div>

            <div className="description">
                {listing.description}
            </div>

            <div className="card-footer">
                <div className="left">
                    <div className="d-block">
                        <div className="label">ASKING PRICE</div>
                        <span className="value">${listing.price}</span>
                    </div>
                </div>
                <div className="right">


                    <button className="make-offer btn-outline" onClick={(e) => openMakeOfferModal(e, listing)}>Make offer now</button>
                    <Link
                        href={`/listings/${listing.id}`}
                        className="btn-filled"
                    >
                        View
                        <Icon icon='arrow_right' />
                    </Link>
                </div>
            </div>




        </div>
    );
}

const Browse: NextPage = () => {
    const listings = api.listings.list.useQuery();

    const [productDetails, setProductDetails] = useState('')

    return (
        <>
            <Head>
                <title>Create T3 App</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div style={{ width: '100%'}}>
                <InvisibleNavbar />
                <main className="container mx-auto flex min-h-screen flex-col gap-12" >


                    <div className="container grid grid-cols-3 items-center justify-center gap-4">
                        {listings?.data?.map((listing) => (
                            <Card key={listing.id} listing={listing} setProductDetails={setProductDetails} />
                        ))}
                    </div>

                    <MakeOfferModal productDetails={productDetails} setProductDetails={setProductDetails} />
                </main>
            </div>
        </>
    );
};

export default Browse;