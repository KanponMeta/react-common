import request from "@/service/request";

export interface CustomerTip {
  name: string;
  code: string;
}
export const getCustomerList = async (): Promise<
  NormalResponse<CustomerTip[]>
> => {
  const response = await request({
    url: "/v1/customer_order_data/getCustomerCodeList",
    method: "get",
  });

  const { status, data } = response.data;

  if (status !== 200) {
    throw new Error("获取客户列表失败");
  }

  const result: CustomerTip[] = data.map((item: any) => {
    return {
      name: item.customer_name,
      code: item.customer_code,
    };
  });

  return new Promise((resolve) => {
    resolve({
      success: true,
      data: result,
      message: "ok",
    });
  });
};

export interface Customer {
  name: string;
  code: string;
  updatedAt: string;
  processCardCount: number;
  orderCount: number;
  orderDetailCount: number;
}

export interface ProcessCard {
  code: string;
  materialType: string;
  grade: string;
  ODWallThickness: string;
  deliveryDate: string;
  seqno: number;
  process: string;
  abnormalProductionStatus: boolean;
  count: number;
  meter: number;
  deliveryDateExceeded: boolean;
  stagnationDuration: string;
}

export interface Steel {
  grade: string;
  count: number;
  meter: number;
  weight: number;
}

export interface CustomerDetail {
  customer: Customer;
  processCards: ProcessCard[];
  steels: Steel[];
}

export const getCustomerDetail = async (
  code: string
): Promise<NormalResponse<CustomerDetail>> => {
  const response = await request({
    url: "/v1/customer_order_data/getGYKandGZList",
    method: "post",
    params: { customer_code: code },
  });

  const {
    status,
    data: { customer_list, process_card_list, steel_grade_list },
  } = response.data;

  if (status !== 200) {
    throw new Error("获取客户详情失败");
  }

  const result: CustomerDetail = {
    customer: {
      name: customer_list?.customer_name || "",
      code: customer_list?.customer_code || "",
      updatedAt: customer_list?.data_update_time || "",
      processCardCount: customer_list?.process_card_count || 0,
      orderCount: customer_list?.customer_order_count || 0,
      orderDetailCount: customer_list?.order_details_count || 0,
    },
    processCards:
      process_card_list?.map((process_card: any): ProcessCard => {
        return {
          code: process_card?.process_card_no || "",
          materialType: process_card?.material_type || "",
          grade: process_card?.steel_grade || "",
          ODWallThickness: process_card?.OD_wall_thickness || "",
          deliveryDate: process_card?.delivery_date || "",
          seqno: process_card?.seqno || 0,
          process: process_card?.process || "",
          abnormalProductionStatus: process_card?.abnormal_production_status
            ? process_card?.abnormal_production_status === "true"
              ? true
              : false
            : false,
          count: process_card?.subbatches_number || 0,
          meter: process_card?.theoretical_meter || 0,
          deliveryDateExceeded: process_card?.delivery_date_exceeded
            ? process_card?.delivery_date_exceeded === "true"
              ? true
              : false
            : false,
          stagnationDuration: process_card?.stagnation_duration || "",
        };
      }) || [],
    steels:
      steel_grade_list?.map((steel: any) => {
        return {
          grade: steel?.steel_grade || "",
          count: steel?.fuzai_count || 0,
          meter: steel?.fuzai_meter || 0,
          weight: steel?.fuzai_weight || 0,
        };
      }) || [],
  };

  return new Promise((resolve) => {
    resolve({
      success: true,
      data: result,
      message: "ok",
    });
  });
};

export interface ProductStatistic {
  id: number;
  nuclearOrderCount: number;
  nonNuclearOrderCount: number;
  nuclearProcessCardCount: number;
  nonNuclearProcessCardCount: number;
  yearProductedProcessCardCount: number;
  quarterProductedProcessCardCount: number;
  monthProductedProcessCardCount: number;
  touliaoAbnormalProcessCardCount: number;
  productedAbnormalProcessCardCount: number;
  startAbnormalProcessCardCount: number;
  dataUpdateTime: string;
}

export const getProductStatistic = async (): Promise<
  NormalResponse<ProductStatistic>
> => {
  const response = await request({
    url: "/v1/customer_order_data/getProductionStatisticsList",
    method: "get",
  });

  const { status, data } = response.data;

  if (status !== 200) {
    throw new Error("获取客户详情失败");
  }

  const result: ProductStatistic = {
    id: data?.id || 0,
    nuclearOrderCount: data?.nuclear_order_count || 0,
    nonNuclearOrderCount: data?.non_nuclear_order_count || 0,
    nuclearProcessCardCount: data?.nuclear_process_card_count || 0,
    nonNuclearProcessCardCount: data?.non_nuclear_process_card_count || 0,
    yearProductedProcessCardCount: data?.year_producted_process_card_count || 0,
    quarterProductedProcessCardCount:
      data?.quarter_producted_process_card_count || 0,
    monthProductedProcessCardCount:
      data?.month_producted_process_card_count || 0,
    touliaoAbnormalProcessCardCount:
      data?.touliao_abnormal_process_card_count || 0,
    productedAbnormalProcessCardCount:
      data?.producted_abnormal_process_card_count || 0,
    startAbnormalProcessCardCount: data?.start_abnormal_process_card_count || 0,
    dataUpdateTime: data?.data_update_time || "",
  };

  return new Promise((resolve) => {
    resolve({
      success: true,
      data: result,
      message: "ok",
    });
  });
};
