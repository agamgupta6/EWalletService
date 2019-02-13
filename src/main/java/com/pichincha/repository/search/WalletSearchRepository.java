package com.pichincha.repository.search;

import com.pichincha.domain.Wallet;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Wallet entity.
 */
public interface WalletSearchRepository extends ElasticsearchRepository<Wallet, Long> {
}
