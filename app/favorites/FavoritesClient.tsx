import { SafeListing, SafeUser } from "@/app/types";

import Heading from '@/app/components/shared/Heading';
import Container from "@/app/components/shared/Container";
import ListingCard from "@/app/components/listings/ListingCard";

interface FavoritesClientProps
{
  listings: SafeListing[],
  currentUser?: SafeUser | null
}

const FavoritesClient = ({
  listings,
  currentUser
}: FavoritesClientProps) =>
{
  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="List of places you've favorited"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map(listing => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
        </div>
    </Container>)
 }

export default FavoritesClient