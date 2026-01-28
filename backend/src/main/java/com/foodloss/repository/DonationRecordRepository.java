package com.foodloss.repository;

import com.foodloss.model.DonationRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DonationRecordRepository extends JpaRepository<DonationRecord, Long> {
}
