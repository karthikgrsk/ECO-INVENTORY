package com.foodloss.dto;

import lombok.Data;

@Data
public class DonationTransferRequest {
    private Long foodItemId;
    private Long donationCenterId;
    private int quantity;
}
