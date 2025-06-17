type PageProps = {
  params: {
    category: string
  }
}

export default function Category({params}:PageProps) {
    return (
        <div>
            {params.category}
        </div>
    )
}