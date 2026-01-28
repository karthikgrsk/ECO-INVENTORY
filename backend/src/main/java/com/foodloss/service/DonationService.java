package com.foodloss.service;

import com.foodloss.dto.DonationTransferRequest;
import com.foodloss.model.DonationCenter;
import com.foodloss.model.DonationRecord;
import com.foodloss.model.FoodItem;
import com.foodloss.repository.DonationCenterRepository;
import com.foodloss.repository.DonationRecordRepository;
import com.foodloss.repository.FoodItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DonationService {

    private final DonationCenterRepository centerRepository;
    private final DonationRecordRepository recordRepository;
    private final FoodItemRepository foodItemRepository;

    public List<DonationCenter> getAllCenters() {
        return centerRepository.findAll();
    }

    @Transactional
    public DonationRecord transferToDonation(DonationTransferRequest request) {
        FoodItem item = foodItemRepository.findById(request.getFoodItemId()).orElseThrow();

        if (item.getQuantity() < request.getQuantity()) {
            throw new RuntimeException("Insufficient quantity for donation");
        }

        item.setQuantity(item.getQuantity() - request.getQuantity());
        foodItemRepository.save(item);

        DonationRecord record = DonationRecord.builder()
                .foodItemId(request.getFoodItemId())
                .donationCenterId(request.getDonationCenterId())
                .quantityDonated(request.getQuantity())
                .donationDate(LocalDate.now())
                .build();

        return recordRepository.save(record);
    }
}
