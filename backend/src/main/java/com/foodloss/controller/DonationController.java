package com.foodloss.controller;

import com.foodloss.dto.DonationTransferRequest;
import com.foodloss.model.DonationCenter;
import com.foodloss.model.DonationRecord;
import com.foodloss.service.DonationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donations")
@RequiredArgsConstructor
public class DonationController {

    private final DonationService service;

    @GetMapping("/centers")
    public List<DonationCenter> getCenters() {
        return service.getAllCenters();
    }

    @PostMapping("/transfer")
    public DonationRecord transfer(@RequestBody DonationTransferRequest request) {
        return service.transferToDonation(request);
    }
}
