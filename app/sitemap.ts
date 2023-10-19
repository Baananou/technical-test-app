import { Product } from "./Types";
import { products } from "./lib/products";

const generateProductURLs = (products: Product[]): string[] => {
	return products.map((product) => `/products/${product.id}`);
};

const generateSitemap = async () => {
	try {
		const productData = await products;
		const productURLs = generateProductURLs(productData);
		const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                ${productURLs.map((url) =>
					`<url>
                        <loc>https://example.com${url}</loc>
                    </url>`).join("")}
            </urlset>`;

		console.log(sitemap);
	} catch (error) {
		console.error("Error generating sitemap:", error);
	}
};

generateSitemap();
