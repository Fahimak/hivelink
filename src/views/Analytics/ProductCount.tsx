"use client";
import { ProductCountItem } from "api/models/Analytics/ctaModel";
import AnalyticsCapsule from "components/AnalyticsCapsule";
import React from "react";

interface Props {
  productsCount: ProductCountItem[];
}

const ProductCount = ({ productsCount }: Props) => {
  //   useEffect(() => {
  //     getProductsCount({
  //       organizationUuid: hiveUuid,
  //       fromDate: fromDate,
  //       toDate: toDate,
  //     });
  //   }, [hiveUuid, fromDate, toDate]);

  return (
    <div className="flex_1_of_3">
      <AnalyticsCapsule>
        <div className="product_count_container">
          <div className="pc_count_head_container">
            <div className="product_count_header">
              <div className="black_box"></div>
              <p className="text-sm">New Visitors</p>
            </div>
            <div className="product_count_header">
              <div className="green_box"></div>
              <p className="text-sm">Old Visitors</p>
            </div>
            <div className="pc_breif_wrapper">
              {productsCount.map((data, idx) => {
                return (
                  <div key={idx} className="justify_between">
                    <h4>
                      {/* {data.appName.length > 10
                        ? data.appName.slice(0, 7) + "..."
                        : data.appName} */}
                      {data.appDisplayName.length > 10
                        ? data.appDisplayName.slice(0, 7) + "..."
                        : data.appDisplayName}
                    </h4>
                    <h4>{data.count}</h4>
                  </div>
                );
              })}
            </div>
          </div>
          {/* <div className="pc_vw_container">
            <hr />
            <NavLink to="details" className="pc_vw_wrapper">
              <p>View Details</p>
              <ChevronRightSVG />
            </NavLink>
          </div> */}
        </div>
      </AnalyticsCapsule>
    </div>
  );
};

export default ProductCount;
