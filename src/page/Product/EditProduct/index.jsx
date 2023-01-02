import { useEffect, useContext, useRef, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProductForm from "component/Product/Form/index";
import { TopNavElement } from "component/common/Navbar/TopNav/index";
import { ProductContext } from "component/common/ProductProvider/index";

import useAPI from "hook/useAPI";
import useFetch from "hook/useFetch";
import useTopNavSetter from "hook/useTopNavSetter";
import useAuthInfo from "hook/useAuthInfo";

import { req } from "lib/api/index";

import ROUTE from "constant/route";

export default function EditProductPage() {
  const { productid } = useParams();
  const navigate = useNavigate();
  const { _id: userId } = useAuthInfo();

  const isMounted = useRef(false);

  // 상품 상세 API
  const [isProductDataFetching, initialProductData, initialProductDataError] =
    useFetch(req.product.detail, { productId: productid });

  const { isFormFilled, productData, dispatchProductData } =
    useContext(ProductContext);

  // 상품 수정 API
  const [isProductEditing, editProductResult, editProductError, editProduct] =
    useAPI(req.product.edit);

  const UploadButton = useMemo(
    () => (
      <TopNavElement.Button
        form="productForm"
        $isAbled={!isFormFilled || isProductEditing}
      >
        저장
      </TopNavElement.Button>
    ),
    [isFormFilled, isProductEditing]
  );

  const { setTopNavRight } = useTopNavSetter({
    title: "상품 수정 페이지",
    left: <TopNavElement.GoBackButton />,
    right: UploadButton,
  });

  useEffect(() => {
    setTopNavRight(UploadButton);
  }, [setTopNavRight, UploadButton]);

  useEffect(() => {
    if (initialProductDataError) {
      console.error(initialProductDataError);
      navigate(ROUTE.HOME);
      return;
    }
    if (initialProductData) {
      if (initialProductData.product.author._id !== userId) {
        navigate(ROUTE.PROFILE);
      }

      dispatchProductData({
        type: "set",
        payload: {
          itemName: initialProductData.product.itemName,
          price: initialProductData.product.price,
          link: initialProductData.product.link,
          itemImage: initialProductData.product.itemImage,
        },
      });
    }
  }, [
    userId,
    initialProductData,
    initialProductDataError,
    navigate,
    dispatchProductData,
  ]);

  useEffect(() => {
    if (!productData) {
      return;
    }

    if (
      !Object.keys(productData).every(
        (key) => productData[key] === initialProductData.product[key]
      )
    ) {
      editProduct({ productId: productid, ...productData });
    } else if (isMounted.current) {
      alert("수정사항이 없스내피!");
    } else {
      isMounted.current = true;
    }
  }, [
    editProduct,
    productData,
    initialProductData,
    productid,
    isMounted,
    navigate,
  ]);

  useEffect(() => {
    if (editProductResult) {
      alert("상품 내용을 수정했스내피!");
      navigate(ROUTE.PROFILE);
      return;
    }
    if (editProductError) {
      alert("수정중 에러가 발생했스내피!");
    }
  }, [editProductResult, editProductError, navigate, initialProductData]);

  return isProductDataFetching ? (
    <>로딩중</>
  ) : (
    <ProductForm formId="productForm" initialProductData={initialProductData} />
  );
}
