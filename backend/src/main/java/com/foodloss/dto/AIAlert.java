package com.foodloss.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AIAlert {
    private Long foodItemId;
    private String foodName;
    private String alertType; // High Spoilage Risk, Surplus, etc.
    private String insight;
    private int currentQuantity;
    private int predictedDemand;
}
