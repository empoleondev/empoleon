import { Button, SimpleGrid } from "@empoleon/core";

export default function SimpleGridDemo() {
  return (
    <div style={{ padding: '40px' }}>
      <SimpleGrid
        type="container"
        cols={{ '1000px': 5, '700px': 2 }}
        spacing={{ base: 'sm', '500px': 'md', '700px': 'xl', '900px': 50 }}
        styles={{ container: { border: '1px solid red', resize: 'both', overflow: 'hidden' } }}
      >
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <Button>{index}</Button>
          ))}
      </SimpleGrid>
    </div>
  )
}
