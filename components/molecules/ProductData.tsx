import axios from 'axios'

const ProductData = async () => {
  const products = await axios.get('http://localhost:3000/api/products')

  return (
    <div className='mt-10'>
      {/* <pre>{ JSON.stringify(products.data.products, null, 2) }</pre> */}
    </div>
  )
}

export default ProductData
