import {
    AlignLeft,
    Filter,
    Search,
    ShoppingCart,
    User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { IProduct } from "../../interfaces/product.interface";
import { ProductService } from "../../service/product.service";
import { API_URL } from "../../lib/api_url";
import { Route } from "../../routes/catalog/index";
import { useNavigate } from "@tanstack/react-router";
import { Cart } from "../Cart";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Filters } from "../Filters";
import { CartService } from "@/service/cart.service";
import { toCurrency } from "@/lib/utils";
import { ProductCarousel } from "../ProductCarousel";
import { AuthAdmin } from "@/providers/auth";
import { Link } from "@tanstack/react-router";

export const Catalog = () => {
    const [products, setProducts] = useState<IProduct[]>();
    const [allProducts, setAllProducts] = useState<IProduct[]>();
    const { category, nameSearch, max } = Route.useSearch();

    const navigate = useNavigate({ from: Route.fullPath });

    async function getProducts() {
        const data = await ProductService.getAll();
        setProducts(data);
        setAllProducts(data);
    }

    async function search(products: IProduct[] | undefined) {
        if (products) {
            let filteredProducts = [...products];
            if (category) {
                if (category == "Все") {
                    filteredProducts = [...products];
                } else {
                    filteredProducts = filteredProducts.filter((product) => {
                        return product.category.name == category;
                    });
                }
            }
            localStorage.setItem(
                "max",
                Math.max
                    .apply(
                        null,
                        filteredProducts.map((product) => Number(product.price))
                    )
                    .toString()
            );
            if (nameSearch !== "" && nameSearch) {
                filteredProducts = filteredProducts.filter((product) => {
                    if (
                        product.name
                            .toLocaleLowerCase()
                            .trim()
                            .includes(nameSearch?.toLocaleLowerCase().trim())
                    ) {
                        return true;
                    }
                });
            }
            if (max) {
                filteredProducts = filteredProducts?.filter((product) => {
                    if (max) {
                        return Number(product.price) <= max;
                    }
                });
            }
            setProducts(
                filteredProducts?.sort((a, b) => {
                    return a.id - b.id;
                })
            );
        }
    }

    function lastThree() {
        if (allProducts) {
            const productToSplice = [
                ...allProducts.sort((a, b) => a.id - b.id),
            ];
            const three = productToSplice?.splice(-3, 3);
            return three;
        }
    }

    useEffect(() => {
        search(allProducts);
    }, [nameSearch, category, max]);

    useEffect(() => {
        search(allProducts);
    });

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="max-w-[1400px] mx-auto relative bg-background w-full h-full">
            <div className="p-2 fixed z-10 top-0 max-w-[1400px] bg-white w-full">
                <div className="flex justify-between">
                    <div className="p-4">
                        <AlignLeft />
                    </div>
                    <div className="flex">
                        <div className="flex items-center">
                            <Dialog>
                                <DialogTrigger>
                                    <Button
                                        variant={"outline"}
                                        className="flex gap-2 font-bold"
                                    >
                                        <Filter />
                                        Фильтры
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <Filters />
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div className="p-4 flex">
                            <Search className="mr-3" />
                            <input
                                value={nameSearch}
                                onChange={(e) =>
                                    navigate({
                                        search: (prev) => ({
                                            ...prev,
                                            nameSearch: e.target.value,
                                        }),
                                    })
                                }
                                type="text"
                                className="w-32 border-b-2 border-black outline-none pl-2 placeholder-slate-400"
                                placeholder="поиск..."
                            />
                        </div>
                        <div className="flex items-center">
                            <AuthAdmin>
                                <Link to="/admin">Админ</Link>
                            </AuthAdmin>
                        </div>
                        <div
                            className="p-4 cursor-pointer"
                            onClick={() => navigate({ to: "/profile" })}
                        >
                            <User />
                        </div>
                        <div className="relative">
                            <Dialog>
                                <DialogTrigger className="p-4">
                                    <ShoppingCart />
                                </DialogTrigger>
                                <DialogContent className="w-fit max-w-none">
                                    <Cart />
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-10 pt-20">
                <ProductCarousel products={allProducts ? lastThree()! : []} />
            </div>

            <div className="py-32">
                <div className="">
                    <div className="px-5 mx-auto w-full grid grid-cols-3 gap-y-20 items-center justify-between">
                        {products
                            ? products.map((product) => (
                                  <div className="flex flex-col mx-auto  gap-1 w-96  justify-center">
                                      <div className="w-96 h-[455px] bg-gradient-to-r from-red-500 relative to-red-800 rounded-2xl">
                                          <div
                                              className={`flex flex-col items-start justify-start h-full w-full bg-cover bg-center rounded-2xl`}
                                              style={{
                                                  backgroundImage: `url(${API_URL}/${product.image})`,
                                              }}
                                          >
                                              <div className="flex w-full px-5 gap-5 absolute right-0 bottom-0 items-end justify-end py-5">
                                                  <ShoppingCart
                                                      color="white"
                                                      size={30}
                                                      onClick={() => {
                                                          CartService.addToCart(
                                                              product
                                                          );
                                                      }}
                                                      className="hover:scale-105 active:scale-95"
                                                  />
                                              </div>
                                          </div>
                                      </div>
                                      <p className="font-extrabold text-start text-3xl first-letter:uppercase">
                                          {product.name}
                                      </p>
                                      <p className="text-start text-sm roboto ">
                                          {product.description}
                                      </p>
                                      <div className="flex gap-1">
                                          <p className="font-bold text-start text-2xl roboto">
                                              {product.discount ? (
                                                  <p className="line-through text-lg font-normal">
                                                      {toCurrency(
                                                          Number(product.price)
                                                      )}
                                                  </p>
                                              ) : (
                                                  toCurrency(
                                                      Number(product.price)
                                                  )
                                              )}
                                          </p>
                                          {product.discount ? (
                                              <p className="font-bold text-start text-2xl roboto">
                                                  {toCurrency(
                                                      Number(
                                                          Math.round(
                                                              Number(
                                                                  product.price
                                                              ) /
                                                                  (product
                                                                      .discount
                                                                      .discount_value /
                                                                      100 +
                                                                      1)
                                                          )
                                                      )
                                                  )}
                                              </p>
                                          ) : (
                                              <></>
                                          )}
                                      </div>
                                  </div>
                              ))
                            : Array.from({ length: 6 }).map(() => (
                                  <div className="w-96 h-[455px] mx-auto bg-[#e7e7e7] relative rounded-2xl"></div>
                              ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
