package com.foodloss.controller;

import com.foodloss.dto.AIAlert;
import com.foodloss.service.AIService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AIController {

    private final AIService service;

    @GetMapping("/expiry-alerts")
    public List<AIAlert> getExpiryAlerts() {
        return service.getExpiryAlerts();
    }

    @GetMapping("/surplus")
    public List<AIAlert> getSurplusAlerts() {
        return service.getSurplusAlerts();
    }

    @GetMapping("/demand-prediction")
    public int getDemand(@RequestParam Long foodItemId, @RequestParam(defaultValue = "3") int days) {
        return service.calculateDemand(foodItemId, days);
    }
}
