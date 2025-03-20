// import { getSearchResults } from '@/lib/search'

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const term =(await searchParams).term

    return <div>{term}</div>
}